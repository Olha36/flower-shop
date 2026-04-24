"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Flower } from "@/types/flowers";
import Header from "../header/header";
import { Typography, Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { isUserLoggedIn } from "@/lib/utils/clientAuth";

const Wishlist = () => {
  const router = useRouter();
  const [items, setItems] = useState<Flower[]>([]);
  const [loggedIn] = useState(() => isUserLoggedIn());

  useEffect(() => {
    if (!loggedIn) {
      router.replace("/auth/signin");
    }
  }, [loggedIn, router]);

  useEffect(() => {
    if (!loggedIn) return;

    const loadWishlist = () => {
      const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
      setItems(wishlist);
    };

    loadWishlist();
    window.addEventListener("wishlist-updated", loadWishlist);

    return () => {
      window.removeEventListener("wishlist-updated", loadWishlist);
    };
  }, [loggedIn]);

  if (!loggedIn) return null;

  const removeFromWishlist = (id: string) => {
    const updated = items.filter((item) => item._id !== id);
    localStorage.setItem("wishlist", JSON.stringify(updated));
    setItems(updated);
    window.dispatchEvent(new Event("wishlist-updated"));
  };

  return (
    <>
      <Header />

      <section className="mx-auto max-w-[1100px] px-6 py-10">
        <Typography
          variant="h1"
          sx={{ margin: "30px auto", textAlign: "center" }}
          className="text-3xl font-bold uppercase text-[#2C2825]"
        >
          Wishlist
        </Typography>

        {items.length === 0 ? (
          <Box className="text-[#2C2825]/70">
            <Typography>Your wishlist is empty.</Typography>
            <Link href="/products" className="mt-4 inline-block underline">
              Go to products
            </Link>
          </Box>
        ) : (
          <Box className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((flower) => (
              <Box
                key={flower._id}
                className="overflow-hidden rounded-[24px] border border-[#e8dfd8] bg-white shadow-sm"
              >
                <Box className="relative aspect-[330/318] overflow-hidden">
                  <Image
                    src={flower.image}
                    alt={flower.description || flower.name}
                    fill
                    className="object-cover"
                  />
                </Box>

                <Box className="p-5">
                  <Typography
                    variant="h2"
                    className="text-[18px] font-bold uppercase text-[#2C2825]"
                  >
                    {flower.name}
                  </Typography>
                  <Typography className="mt-2 text-[15px] font-bold text-black/60">
                    ${flower.price}/Bunch
                  </Typography>

                  <button
                    type="button"
                    onClick={() => removeFromWishlist(flower._id)}
                    className="mt-4 rounded-full border border-[#2C2825] px-4 py-2 text-sm font-semibold uppercase text-[#2C2825] transition hover:bg-[#2C2825] hover:text-white"
                  >
                    Remove
                  </button>
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </section>
    </>
  );
};

export default Wishlist;
