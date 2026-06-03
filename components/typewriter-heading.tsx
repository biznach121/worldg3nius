"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

export function TypewriterHeading({
  children,
  className,
  typeIndex,
}: {
  children: string;
  className: string;
  typeIndex: 0 | 1 | 2;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || seen) return;

    if (!("IntersectionObserver" in window)) {
      setSeen(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setSeen(true);
        observer.disconnect();
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.28 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [seen]);

  return (
    <h2
      ref={ref}
      className={[
        `wg-typewriter wg-typewriter-${typeIndex}`,
        seen ? "wg-typewriter--run" : "",
        className,
      ].join(" ")}
      style={{ "--characters": children.length } as CSSProperties}
    >
      {children}
    </h2>
  );
}
