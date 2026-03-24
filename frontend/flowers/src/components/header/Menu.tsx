/* eslint-disable react-hooks/purity */
"use client";

import Link from "next/link";

type MenuProps = {
  open: boolean;
};

export default function Menu({ open }: MenuProps) {
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
        <div
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

      <Link href="#" className="font-bold text-[30px] text-white relative z-10">
        Gallery
      </Link>
      <Link href="#" className="font-bold text-[30px] text-white relative z-10">
        About
      </Link>
      <Link href="#" className="font-bold text-[30px] text-white relative z-10">
        Contact
      </Link>

      <style jsx>{`
        .shine {
          position: absolute;
          background-repeat: no-repeat;
          background-size: contain;
          opacity: 0;
          animation: glitter 6s linear infinite;
          z-index: 0;
        }
        .shine.small {
          width: 20px;
          height: 20px;
        }
        .shine.medium {
          width: 30px;
          height: 30px;
        }
        .shine.large {
          width: 50px;
          height: 50px;
        }
        @keyframes glitter {
          0% {
            transform: scale(0.3) rotate(0deg);
            opacity: 0;
          }
          25% {
            transform: scale(1) rotate(360deg);
            opacity: 1;
          }
          50% {
            transform: scale(0.3) rotate(720deg);
            opacity: 0;
          }
          100% {
            transform: scale(0.3) rotate(0deg);
            opacity: 0;
          }
        }
      `}</style>
    </nav>
  );
}
