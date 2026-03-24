"use client";

type BurgerProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export default function Burger({ open, setOpen }: BurgerProps) {
  return (
    <button
      onClick={() => setOpen(!open)}
      className="fixed top-[5%] right-8 w-8 h-8 z-50 focus:outline-none relative block sm:hidden"
    >
      <div
        className={`
          absolute w-8 h-[3px] bg-black rounded transition-all duration-300
          origin-[1px]
          ${open ? "rotate-45 top-[-6px]" : "top-0"}
        `}
      />

      <div
        className={`
          absolute w-8 h-[3px] bg-black rounded transition-all duration-300
          top-1/2 -translate-y-1/2
          ${open ? "opacity-0 translate-x-5" : ""}
        `}
      />

      <div
        className={`
          absolute w-8 h-[3px] bg-black rounded transition-all duration-300
          origin-[1px]
          ${open ? "-rotate-45 top-1/2" : "bottom-0"}
        `}
      />
    </button>
  );
}
