"use client";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import logo from "../../../assets/logo.svg";
import Burger from "./Burger";
import Menu from "./Menu";

const Header = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref as React.RefObject<HTMLElement>, () => setOpen(false));
  return (
    // <header className="py-[27px] flex items-center justify-between px-[40px]">
    //   <Image src={logo} alt={logo} width={100} height={100} />
    //   <nav className="hidden sm:flex gap-[40px] ">
    //     <Link
    //       href="#"
    //       className="font-bold text-[14px] leading-[140%] tracking-[0.02em] uppercase text-[#2C2825]"
    //     >
    //       Gallery
    //     </Link>
    //     <Link
    //       href="#"
    //       className="font-bold text-[14px] leading-[140%] tracking-[0.02em] uppercase text-[#2C2825]"
    //     >
    //       About
    //     </Link>
    //     <Link
    //       href="#"
    //       className="font-bold text-[14px] leading-[140%] tracking-[0.02em] uppercase text-[#2C2825]"
    //     >
    //       Contact
    //     </Link>
    //   </nav>

    //   <div ref={ref}>
    //     <Burger open={open} setOpen={setOpen} />
    //     <Menu open={open} />
    //   </div>
    // </header>
    <header className="py-[27px] flex items-center px-[40px]">
      <Image src={logo} alt="logo" width={100} height={100} />

      <div className="ml-auto flex items-center gap-[40px]" ref={ref}>
        <nav className="hidden sm:flex gap-[40px]">
          <Link
            className="font-bold text-[14px] uppercase text-[#2C2825]"
            href="#"
          >
            Gallery
          </Link>
          <Link
            className="font-bold text-[14px] uppercase text-[#2C2825]"
            href="#"
          >
            About
          </Link>
          <Link
            className="font-bold text-[14px] uppercase text-[#2C2825]"
            href="#"
          >
            Contact
          </Link>
        </nav>

        <Burger open={open} setOpen={setOpen} />
        <Menu open={open} />
      </div>
    </header>
  );
};

export default Header;
