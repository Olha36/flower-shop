import Header from "@/components/header/header";
import { getStripeServerClient, isStripeConfigured } from "@/lib/stripe";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id: sessionId } = await searchParams;

  if (!sessionId) {
    notFound();
  }

  if (!isStripeConfigured()) {
    return (
      <>
        <Header />
        <section className="mx-auto max-w-[900px] px-6 py-10">
          <div className="rounded-[28px] border border-[#eaded6] bg-white p-8 shadow-sm">
            <Typography variant="h1" className="text-3xl uppercase text-[#2C2825]">
              Receipt unavailable
            </Typography>
            <Typography className="mt-4 text-base leading-7 text-[#5d524c]">
              Stripe is not configured in this environment yet, so the receipt page
              cannot retrieve the checkout session.
            </Typography>
          </div>
        </section>
      </>
    );
  }

  const stripe = getStripeServerClient();
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  const lineItems = await stripe.checkout.sessions.listLineItems(sessionId, {
    limit: 10,
  });

  const bouquetItem = lineItems.data[0];
  const deliveryItem = lineItems.data[1];
  const total = (session.amount_total ?? 0) / 100;
  const subtotal = bouquetItem ? (bouquetItem.amount_total ?? 0) / 100 : 0;
  const deliveryTotal = deliveryItem ? (deliveryItem.amount_total ?? 0) / 100 : 0;
  const imageUrl = bouquetItem?.price?.product &&
    typeof bouquetItem.price.product !== "string" &&
    "images" in bouquetItem.price.product
      ? bouquetItem.price.product.images?.[0]
      : null;

  return (
    <>
      <Header />
      <section className="mx-auto flex w-full max-w-[1080px] flex-col gap-8 px-6 py-10 lg:flex-row">
        <Box className="flex-1 rounded-[32px] border border-[#eaded6] bg-[#fffaf6] p-6 shadow-sm">
          <Typography className="text-sm font-semibold uppercase tracking-[0.25em] text-[#9f6d55]">
            Receipt
          </Typography>
          <Typography
            variant="h1"
            className="mt-3 text-4xl font-semibold uppercase leading-[0.96] text-[#2C2825]"
          >
            Purchase Confirmed
          </Typography>
          <Typography className="mt-4 max-w-[44rem] text-base leading-7 text-[#5d524c]">
            Your Stripe test checkout completed successfully. This is a portfolio
            purchase flow, so no real payment was taken.
          </Typography>

          <Box className="mt-8 grid gap-4 rounded-[28px] bg-white p-5 shadow-sm">
            <Typography className="text-sm font-semibold uppercase tracking-[0.2em] text-[#9f6d55]">
              Confirmation
            </Typography>
            <Box className="grid gap-3 text-sm text-[#2C2825]">
              <div className="flex items-center justify-between gap-4">
                <span>Payment status</span>
                <span className="font-semibold uppercase">
                  {session.payment_status}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span>Receipt email</span>
                <span className="font-semibold">
                  {session.customer_details?.email || "Collected in Stripe"}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span>Session ID</span>
                <span className="max-w-[18rem] truncate font-semibold">
                  {session.id}
                </span>
              </div>
            </Box>
          </Box>

          <Box className="mt-6 grid gap-4 rounded-[28px] border border-dashed border-[#d8c6bb] bg-[#fffdfb] p-5">
            <Typography className="text-sm font-semibold uppercase tracking-[0.2em] text-[#9f6d55]">
              Order Summary
            </Typography>
            <Box className="space-y-3 text-sm text-[#2C2825]">
              <div className="flex items-center justify-between gap-4">
                <span>{bouquetItem?.description || "Bouquet"}</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span>{deliveryItem?.description || "Delivery"}</span>
                <span>${deliveryTotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between gap-4 border-t border-[#eaded6] pt-3 text-lg font-semibold">
                <span>Total paid</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </Box>
          </Box>

          <Box className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/products"
              className="rounded-full bg-[#2C2825] px-5 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-[#443e39]"
            >
              Continue Shopping
            </Link>
            <Link
              href="/wishlist"
              className="rounded-full border border-[#2C2825] px-5 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-[#2C2825] transition hover:bg-[#2C2825] hover:text-white"
            >
              Open Wishlist
            </Link>
          </Box>
        </Box>

        <Box className="w-full max-w-[360px] rounded-[32px] border border-[#eaded6] bg-white p-5 shadow-sm">
          <div className="overflow-hidden rounded-[26px] bg-[#f5ece4]">
            {imageUrl ? (
              <div className="relative aspect-[4/4.3]">
                <Image
                  src={imageUrl}
                  alt={bouquetItem?.description || "Product image"}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="flex aspect-[4/4.3] items-center justify-center text-sm uppercase tracking-[0.2em] text-[#9f6d55]">
                Receipt Image
              </div>
            )}
          </div>

          <Typography className="mt-5 text-sm font-semibold uppercase tracking-[0.2em] text-[#9f6d55]">
            Delivery info
          </Typography>
          <Typography className="mt-3 text-2xl font-semibold uppercase leading-[1.05] text-[#2C2825]">
            {bouquetItem?.description || "Bouquet order"}
          </Typography>
          <Typography className="mt-3 text-sm leading-7 text-[#5d524c]">
            {deliveryItem?.description || "Delivery"} was included in this test
            purchase. The receipt above comes from the Stripe Checkout session.
          </Typography>
        </Box>
      </section>
    </>
  );
}
