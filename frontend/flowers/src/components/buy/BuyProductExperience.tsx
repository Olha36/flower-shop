"use client";

import type { Flower } from "@/types/flowers";
import { Box, CircularProgress, Typography } from "@mui/material";
import Image from "next/image";
import { useMemo, useState } from "react";

type BuyProductExperienceProps = {
  flower: Flower;
  stripeReady: boolean;
};

const deliveryOptions = [
  {
    id: "studio-pickup",
    label: "Studio pickup",
    description: "Collect your bouquet from our studio between 10:00 and 19:00.",
    price: 0,
  },
  {
    id: "city-delivery",
    label: "City delivery",
    description: "Same-day courier delivery across the city center.",
    price: 12,
  },
  {
    id: "premium-delivery",
    label: "Premium delivery",
    description: "Timed delivery with a handwritten card and gift wrapping.",
    price: 25,
  },
] as const;

export default function BuyProductExperience({
  flower,
  stripeReady,
}: BuyProductExperienceProps) {
  const [quantity, setQuantity] = useState(1);
  const [deliveryId, setDeliveryId] =
    useState<(typeof deliveryOptions)[number]["id"]>("city-delivery");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedDelivery =
    deliveryOptions.find((option) => option.id === deliveryId) ?? deliveryOptions[1];

  const subtotal = flower.price * quantity;
  const total = subtotal + selectedDelivery.price;

  const orderSummary = useMemo(
    () => ({
      subtotal,
      total,
      deliveryPrice: selectedDelivery.price,
    }),
    [selectedDelivery.price, subtotal, total]
  );

  const handleCheckout = async () => {
    if (!stripeReady) {
      setError(
        "Stripe test mode is not configured yet. Add your STRIPE_SECRET_KEY in .env.local first."
      );
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/checkout/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          flower,
          quantity,
          delivery: {
            id: selectedDelivery.id,
            label: selectedDelivery.label,
            price: selectedDelivery.price,
          },
        }),
      });

      const data = (await response.json()) as { url?: string; error?: string };

      if (!response.ok || !data.url) {
        throw new Error(data.error || "Could not create Stripe checkout session.");
      }

      window.location.href = data.url;
    } catch (checkoutError) {
      setError(
        checkoutError instanceof Error
          ? checkoutError.message
          : "Could not start checkout."
      );
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mx-auto flex w-full max-w-[1180px] flex-col gap-8 px-6 py-10 lg:flex-row">
      <Box className="flex-1 overflow-hidden rounded-[32px] border border-[#eaded6] bg-white shadow-sm">
        <Box className="relative aspect-[4/4.5] w-full overflow-hidden bg-[#f7f1eb]">
          <Image
            src={flower.image}
            alt={flower.description || flower.name}
            fill
            className="object-cover"
            priority
          />
        </Box>
      </Box>

      <Box className="flex flex-1 flex-col gap-6 rounded-[32px] border border-[#eaded6] bg-[#fffaf6] p-6 shadow-sm">
        <Box className="space-y-3">
          <Typography className="text-xs font-semibold uppercase tracking-[0.35em] text-[#9f6d55]">
            Portfolio Checkout
          </Typography>
          <Typography
            variant="h1"
            sx={{
              fontSize: {
                xs: "2rem",
                md: "4rem",
                lg: "6rem",
              },
              fontWeight: 600,
              lineHeight: 0.96,
              textTransform: "uppercase",
              color: "#2C2825",
            }}
          >
            {flower.name}
          </Typography>

          <Typography className="max-w-[42rem] text-base leading-7 text-[#5d524c]">
            {flower.description ||
              "A hand-tied bouquet prepared in our signature portfolio flow."}
          </Typography>
        </Box>

        <Box className="grid gap-4 rounded-[24px] bg-white p-5 shadow-sm">
          <Typography className="text-sm font-semibold uppercase tracking-[0.2em] text-[#9f6d55]">
            Quantity
          </Typography>
          <Box className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setQuantity((current) => Math.max(1, current - 1))}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#2C2825] text-xl text-[#2C2825] transition hover:bg-[#2C2825] hover:text-white"
            >
              -
            </button>
            <Typography className="min-w-10 text-center text-2xl font-semibold text-[#2C2825]">
              {quantity}
            </Typography>
            <button
              type="button"
              onClick={() =>
                setQuantity((current) => Math.min(24, current + 1))
              }
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#2C2825] text-xl text-[#2C2825] transition hover:bg-[#2C2825] hover:text-white"
            >
              +
            </button>
          </Box>
        </Box>

        <Box className="grid gap-4 rounded-[24px] bg-white p-5 shadow-sm">
          <Typography className="text-sm font-semibold uppercase tracking-[0.2em] text-[#9f6d55]">
            Delivery
          </Typography>
          <Box className="grid gap-3">
            {deliveryOptions.map((option) => {
              const selected = option.id === deliveryId;

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setDeliveryId(option.id)}
                  className={`rounded-[22px] border px-4 py-4 text-left transition ${
                    selected
                      ? "border-[#2C2825] bg-[#2C2825] text-white"
                      : "border-[#e3d5cc] bg-[#fffaf6] text-[#2C2825] hover:border-[#2C2825]"
                  }`}
                >
                  <Box className="flex items-start justify-between gap-4">
                    <Box>
                      <Typography className="text-base font-semibold uppercase tracking-[0.08em]">
                        {option.label}
                      </Typography>
                      <Typography
                        className={`mt-2 text-sm leading-6 ${
                          selected ? "text-white/80" : "text-[#6f625c]"
                        }`}
                      >
                        {option.description}
                      </Typography>
                    </Box>
                    <Typography className="whitespace-nowrap text-sm font-semibold uppercase tracking-[0.08em]">
                      {option.price === 0 ? "Free" : `$${option.price}`}
                    </Typography>
                  </Box>
                </button>
              );
            })}
          </Box>
        </Box>

        <Box className="grid gap-4 rounded-[28px] border border-dashed border-[#d8c6bb] bg-[#fffdfb] p-5">
          <Typography className="text-sm font-semibold uppercase tracking-[0.2em] text-[#9f6d55]">
            Order Summary
          </Typography>
          <Box className="space-y-3 text-[#2C2825]">
            <Box className="flex items-center justify-between gap-4 text-sm">
              <span>
                {flower.name} x {quantity}
              </span>
              <span>${orderSummary.subtotal.toFixed(2)}</span>
            </Box>
            <Box className="flex items-center justify-between gap-4 text-sm">
              <span>{selectedDelivery.label}</span>
              <span>${orderSummary.deliveryPrice.toFixed(2)}</span>
            </Box>
            <Box className="flex items-center justify-between gap-4 border-t border-[#eaded6] pt-3 text-lg font-semibold">
              <span>Total</span>
              <span>${orderSummary.total.toFixed(2)}</span>
            </Box>
          </Box>
        </Box>

        <Box className="rounded-[24px] bg-[#2C2825] p-5 text-white">
          <Typography className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60">
            Purchase Confirmation
          </Typography>
          <Typography className="mt-3 text-sm leading-6 text-white/80">
            This portfolio checkout uses Stripe in test mode only. No real
            payment is collected. After a successful test checkout, you will see
            a styled receipt page back in the app.
          </Typography>

          <button
            type="button"
            onClick={handleCheckout}
            disabled={isSubmitting}
            className="mt-5 inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-[#2C2825] transition hover:bg-[#f3ece7] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? (
              <span className="inline-flex items-center gap-3">
                <CircularProgress size={18} color="inherit" />
                Redirecting to Stripe
              </span>
            ) : (
              "Confirm Purchase"
            )}
          </button>

          {error && (
            <Typography className="mt-4 text-sm leading-6 text-[#ffd2cd]">
              {error}
            </Typography>
          )}

          {!stripeReady && (
            <Typography className="mt-4 text-sm leading-6 text-[#ffd2cd]">
              Add `STRIPE_SECRET_KEY` to `.env.local` to enable Stripe Checkout
              in test mode.
            </Typography>
          )}
        </Box>
      </Box>
    </section>
  );
}
