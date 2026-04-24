"use client";

import Image from "next/image";
import { Heart } from "lucide-react";
import { Box, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import type { Flower } from "@/types/flowers";
import LazyReveal from "../lazy-reveal/LazyReveal";
import { useRouter } from "next/navigation";
import { isUserLoggedIn } from "@/lib/utils/clientAuth";

type ProductCardProps = {
  flower: Flower;
};

const ProductCard = ({ flower }: ProductCardProps) => {
  const router = useRouter();

  const [isWishlisted, setIsWishlisted] = useState(() => {
    if (typeof window === "undefined") return false;

    const wishlist: Flower[] = JSON.parse(
      localStorage.getItem("wishlist") || "[]"
    );

    return wishlist.some((item) => item._id === flower._id);
  });

  const formattedPrice = useMemo(
    () => `$${flower.price}/Bunch`,
    [flower.price]
  );

  useEffect(() => {
    const syncWishlistState = () => {
      const wishlist: Flower[] = JSON.parse(
        localStorage.getItem("wishlist") || "[]"
      );

      setIsWishlisted(wishlist.some((item) => item._id === flower._id));
    };

    window.addEventListener("wishlist-updated", syncWishlistState);

    return () => {
      window.removeEventListener("wishlist-updated", syncWishlistState);
    };
  }, [flower._id]);

  const handleWishlistClick = () => {
    if (!isUserLoggedIn()) {
      router.push("/auth/signin");
      return;
    }

    const currentWishlist: Flower[] = JSON.parse(
      localStorage.getItem("wishlist") || "[]"
    );

    const exists = currentWishlist.some((item) => item._id === flower._id);

    const updatedWishlist = exists
      ? currentWishlist.filter((item) => item._id !== flower._id)
      : [...currentWishlist, flower];

    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    setIsWishlisted(!exists);
    window.dispatchEvent(new Event("wishlist-updated"));
  };

  const handleBuyClick = () => {
    console.log("Buy product:", flower);
  };

  return (
    <LazyReveal>
      <Box className="group overflow-hidden rounded-[24px] border border-[#e8dfd8] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
        <Box className="relative aspect-[330/318] overflow-hidden">
          <button
            type="button"
            onClick={handleWishlistClick}
            aria-label={
              isWishlisted ? "Remove from wishlist" : "Add to wishlist"
            }
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur transition hover:scale-105"
          >
            <Heart
              className="h-5 w-5 transition"
              color={isWishlisted ? "#c45c54" : "#2C2825"}
              fill={isWishlisted ? "#c45c54" : "transparent"}
            />
          </button>

          <Image
            src={flower.image}
            alt={flower.description || flower.name}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        </Box>

        <Box className="flex min-h-[180px] flex-col gap-4 p-5">
          <Box className="space-y-2">
            <Typography
              variant="h2"
              sx={{ fontSize: "18px", fontWeight: "bold" }}
              className="uppercase leading-[140%] text-[#2C2825]"
            >
              {flower.name}
            </Typography>
            <Typography
              sx={{ fontSize: "15px", fontWeight: "bold" }}
              className="leading-[140%] tracking-[-0.025em] text-black/60"
            >
              {formattedPrice}
            </Typography>
          </Box>

          <button
            type="button"
            onClick={handleBuyClick}
            className="mt-auto rounded-full bg-[#2C2825] px-5 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-[#443e39]"
          >
            Buy a product
          </button>
        </Box>
      </Box>
    </LazyReveal>
  );
};

export default ProductCard;
