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
    <header className="py-[27px] flex items-center px-[40px]">
      <Link className="font-bold text-[14px] uppercase text-[#2C2825]" href="/">
        <Image src={logo} alt="logo" width={100} height={100} />
      </Link>

      <div className="ml-auto flex items-center gap-[40px]" ref={ref}>
        <nav className="hidden sm:flex gap-[40px]">
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
        <Menu open={open} />
      </div>
    </header>
  );
};

export default Header;
