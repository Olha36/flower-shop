import { getStripeServerClient } from "@/lib/stripe";
import type { Flower } from "@/types/flowers";
import { NextResponse } from "next/server";

type CheckoutRequest = {
  flower: Flower;
  quantity: number;
  delivery: {
    id: string;
    label: string;
    price: number;
  };
};

export async function POST(request: Request) {
  try {
    const stripe = getStripeServerClient();
    const body = (await request.json()) as CheckoutRequest;

    const quantity = Math.max(1, Math.min(24, Number(body.quantity) || 1));
    const flower = body.flower;
    const delivery = body.delivery;

    if (!flower?._id || !flower?.name || typeof flower?.price !== "number") {
      return NextResponse.json(
        { error: "Invalid product data." },
        { status: 400 }
      );
    }

    const origin =
      request.headers.get("origin") ||
      process.env.NEXT_PUBLIC_APP_URL ||
      "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/buy/${flower._id}?canceled=true`,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: flower.name,
              description: flower.description,
              images: [flower.image],
              metadata: {
                productId: flower._id,
              },
            },
            unit_amount: Math.round(flower.price * 100),
          },
          quantity,
        },
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: delivery.label,
              description: "Portfolio delivery option",
            },
            unit_amount: Math.round(delivery.price * 100),
          },
          quantity: 1,
        },
      ],
      metadata: {
        productId: flower._id,
        productName: flower.name,
        deliveryId: delivery.id,
        deliveryLabel: delivery.label,
        quantity: String(quantity),
      },
      submit_type: "pay",
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Stripe did not return a checkout URL." },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Could not create Stripe checkout session.",
      },
      { status: 500 }
    );
  }
}
