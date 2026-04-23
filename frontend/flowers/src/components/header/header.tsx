"use client";

import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import logo from "../../../assets/logo.svg";
import Burger from "./Burger";
import Menu from "./Menu";
import { Heart } from "lucide-react";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref as React.RefObject<HTMLElement>, () => setOpen(false));

  useEffect(() => {
    const updateWishlistCount = () => {
      const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
      setWishlistCount(wishlist.length);
    };

    updateWishlistCount();

    window.addEventListener("wishlist-updated", updateWishlistCount);
    window.addEventListener("storage", updateWishlistCount);

    return () => {
      window.removeEventListener("wishlist-updated", updateWishlistCount);
      window.removeEventListener("storage", updateWishlistCount);
    };
  }, []);

  const hasWishlistItems = wishlistCount > 0;

  return (
    <header className="py-[27px] flex items-center px-[40px]">
      <Link className="font-bold text-[14px] uppercase text-[#2C2825]" href="/">
        <Image src={logo} alt="logo" width={100} height={100} />
      </Link>

      <div className="ml-auto flex items-center gap-[40px]" ref={ref}>
        <nav className="hidden sm:flex gap-[40px] items-center">
          <Link
            className="font-bold text-[14px] uppercase text-[#2C2825]"
            href="/products"
          >
            Our products
          </Link>

          <Link href="/wishlist" className="relative">
            <Heart
              className={`h-5 w-5 transition ${
                hasWishlistItems
                  ? "fill-[#c45c54] text-[#c45c54]"
                  : "text-[#2C2825]"
              }`}
            />
            {hasWishlistItems && (
              <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#c45c54] px-1 text-[10px] font-bold text-white">
                {wishlistCount}
              </span>
            )}
          </Link>

          <Link
            className="font-bold text-[14px] uppercase text-[#2C2825]"
            href="/gallery"
          >
            Gallery
          </Link>
          <Link
            className="font-bold text-[14px] uppercase text-[#2C2825]"
            href="/about"
          >
            About
          </Link>
          <Link
            className="font-bold text-[14px] uppercase text-[#2C2825]"
            href="/contact"
          >
            Contact
          </Link>
        </nav>

        <Burger open={open} setOpen={setOpen} />
        <Menu open={open} setOpen={setOpen} />
      </div>
    </header>
  );
};

export default Header;
