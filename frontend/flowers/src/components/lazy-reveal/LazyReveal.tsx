// "use client";

// import { useEffect, useRef, useState, type ReactNode } from "react";

// type LazyRevealProps = {
//   children: ReactNode;
//   className?: string;
//   delayMs?: number;
//   distance?: number;
// };

// const LazyReveal = ({
//   children,
//   className = "",
//   delayMs = 0,
//   distance = 40,
// }: LazyRevealProps) => {
//   const ref = useRef<HTMLDivElement | null>(null);
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     const element = ref.current;
//     if (!element) return;

//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setIsVisible(true);
//           observer.unobserve(entry.target);
//         }
//       },
//       {
//         threshold: 0.15,
//         rootMargin: "0px 0px -10% 0px",
//       }
//     );

//     observer.observe(element);
//     return () => observer.disconnect();
//   }, []);

//   return (
//     <div
//       ref={ref}
//       className={className}
//       style={{
//         opacity: isVisible ? 1 : 0,
//         transform: isVisible ? "translateY(0)" : `translateY(${distance}px)`,
//         transition:
//           "opacity 700ms ease-out, transform 700ms cubic-bezier(0.22, 1, 0.36, 1)",
//         transitionDelay: `${delayMs}ms`,
//         willChange: "opacity, transform",
//       }}
//     >
//       {children}
//     </div>
//   );
// };

// export default LazyReveal;



"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type LazyRevealProps = {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  distance?: number;
};

const LazyReveal = ({
  children,
  className = "",
  delayMs = 0,
  distance = 40,
}: LazyRevealProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : `translateY(${distance}px)`,
        transition:
          "opacity 700ms ease-out, transform 700ms cubic-bezier(0.22, 1, 0.36, 1)",
        transitionDelay: `${delayMs}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
};

export default LazyReveal;
