/* eslint-disable react-hooks/purity */
"use client";

import Link from "next/link";
import "./menu.css";
import { Box } from "@mui/material";

type MenuProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export default function Menu({ open, setOpen }: MenuProps) {
  const stars = Array.from({ length: 200 }).map(() => ({
    top: Math.random() * 100 + "%",
    left: Math.random() * 100 + "%",
    size:
      Math.random() < 0.33 ? "small" : Math.random() < 0.5 ? "medium" : "large",
    delay: Math.random() * 6 + "s",
  }));

  return (
    <nav
      className={`
    bg-indigo-800
        fixed top-0 right-0 h-screen w-full sm:w-auto
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
    </nav>
  );
}
