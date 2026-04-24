/* eslint-disable react-hooks/purity */
"use client";

import Link from "next/link";
import { actions } from "@/data/actions";
import "./menu.css";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { isUserLoggedIn } from "@/lib/utils/clientAuth";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";

type MenuProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export default function Menu({ open, setOpen }: MenuProps) {
  const [userLoggedIn, setUserLoggedIn] = useState(() => isUserLoggedIn());
  const [wishlistCount, setWishlistCount] = useState(0);
  const router = useRouter();

  const stars = Array.from({ length: 200 }).map(() => ({
    top: Math.random() * 100 + "%",
    left: Math.random() * 100 + "%",
    size:
      Math.random() < 0.33 ? "small" : Math.random() < 0.5 ? "medium" : "large",
    delay: Math.random() * 6 + "s",
  }));

  const handleWishlistNavigation = (
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    event.preventDefault();

    if (!isUserLoggedIn()) {
      router.push("/auth/signin");
      return;
    }

    router.push("/wishlist");
  };

  useEffect(() => {
    const updateWishlistCount = () => {
      const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
      setWishlistCount(wishlist.length);
    };

    updateWishlistCount();
    const syncAuthState = () => {
      setUserLoggedIn(isUserLoggedIn());
    };

    syncAuthState();
    window.addEventListener("wishlist-updated", updateWishlistCount);
    window.addEventListener("storage", updateWishlistCount);
    window.addEventListener("focus", syncAuthState);

    return () => {
      window.removeEventListener("wishlist-updated", updateWishlistCount);
      window.removeEventListener("storage", updateWishlistCount);
      window.removeEventListener("focus", syncAuthState);
    };
  }, []);

  const hasWishlistItems = wishlistCount > 0;

  const handleLogout = async () => {
    await actions.auth.logoutAction();
    setUserLoggedIn(false);
    setOpen(false);
    router.push("/");
    router.refresh();
  };

  return (
    <nav
      className={`
    bg-indigo-800
        fixed inset-0 z-[100] h-screen w-full sm:w-auto
        flex flex-col justify-center items-center gap-10
         p-8
        transform transition-transform duration-300 ease-in-out
        ${open ? "translate-x-0" : "translate-x-full"}
      `}
    >
      {stars.map((star, index) => (
        <Box
          key={index}
          className={`absolute z-0 shine ${star.size}`}
          style={{
            top: star.top,
            left: star.left,
            animationDelay: star.delay,
            backgroundImage: `url("/star.png")`,
          }}
        />
      ))}

      <Link
        href="/gallery"
        className="font-bold text-[30px] text-white relative z-10"
        onClick={() => setOpen(false)}
      >
        Gallery
      </Link>
      <Link
        href="/about"
        className="font-bold text-[30px] text-white relative z-10"
        onClick={() => setOpen(false)}
      >
        About
      </Link>
      <Link
        href="/contact"
        className="font-bold text-[30px] text-white relative z-10"
        onClick={() => setOpen(false)}
      >
        Contact
      </Link>

      <Link
        href="/wishlist"
        onClick={handleWishlistNavigation}
        className="relative z-10"
      >
        <Heart
          className="h-5 w-5 transition"
          color={hasWishlistItems ? "#c45c54" : "#fff"}
          fill={hasWishlistItems ? "#c45c54" : "transparent"}
        />
        {hasWishlistItems && (
          <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#c45c54] px-1 text-[10px] font-bold text-white">
            {wishlistCount}
          </span>
        )}
      </Link>

      {userLoggedIn ? (
        <button
          type="button"
          onClick={handleLogout}
          className="font-bold text-[30px] text-white relative z-10"
        >
          Sign out
        </button>
      ) : (
        <Link
          className="font-bold text-[30px] text-white relative z-10"
          href="/auth/signin"
          onClick={() => setOpen(false)}
        >
          Log in
        </Link>
      )}
    </nav>
  );
}
