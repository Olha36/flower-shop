import BuyProductExperience from "@/components/buy/BuyProductExperience";
import Header from "@/components/header/header";
import { getFlowerById } from "@/lib/api";
import { isStripeConfigured } from "@/lib/stripe";
import { notFound } from "next/navigation";

export default async function BuyProductPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ canceled?: string }>;
}) {
  const [{ id }, query] = await Promise.all([params, searchParams]);
  const flower = await getFlowerById(id);

  if (!flower) {
    notFound();
  }

  return (
    <>
      <Header />
      {query.canceled === "true" && (
        <div className="mx-auto mt-6 w-full max-w-[1180px] px-6">
          <div className="rounded-[24px] border border-[#eaded6] bg-[#fff7f5] px-5 py-4 text-sm text-[#7a4e43] shadow-sm">
            Stripe checkout was canceled. Your order details are still here if you
            want to try again.
          </div>
        </div>
      )}
      <BuyProductExperience flower={flower} stripeReady={isStripeConfigured()} />
    </>
  );
}
