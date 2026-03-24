"use client"
import Link from "next/link";
import logo from "../../../assets/logo.svg";
import Image from "next/image";
import Burger from "./Burger";
import Menu from "./Menu";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { useRef, useState } from "react";

const Header = () => {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useOnClickOutside(ref as React.RefObject<HTMLElement>, () => setOpen(false));
  return (
    <header className="py-[27px] flex items-center justify-between px-[40px]">
      <Image src={logo} alt={logo} width={100} height={100} />
      <nav className="hidden sm:flex gap-[40px] ">
        <Link
          href="#"
          className="font-bold text-[14px] leading-[140%] tracking-[0.02em] uppercase text-[#2C2825]"
        >
          Gallery
        </Link>
        <Link
          href="#"
          className="font-bold text-[14px] leading-[140%] tracking-[0.02em] uppercase text-[#2C2825]"
        >
          About
        </Link>
        <Link
          href="#"
          className="font-bold text-[14px] leading-[140%] tracking-[0.02em] uppercase text-[#2C2825]"
        >
          Contact
        </Link>
      </nav>

      <div ref={ref}>
        <Burger open={open} setOpen={setOpen} />
        <Menu open={open} />
      </div>
    </header>
  );
};

export default Header;
