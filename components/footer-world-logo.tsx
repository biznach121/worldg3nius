"use client";

import { useEffect, useRef, useState } from "react";

export function FooterWorldLogo() {
  const ref = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setVisible(true);
        observer.disconnect();
      },
      { threshold: 0.45 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className={[
        "wg-footer-logo relative block h-9 w-9 shrink-0",
        visible ? "wg-footer-logo--visible" : "",
      ].join(" ")}
    >
      <svg className="h-full w-full overflow-visible" viewBox="0 0 140 140">
        <defs>
          <clipPath id="wg-footer-globe-clip">
            <path d="M70 5c21 0 45 7 56 23 11 17 11 42 2 62-9 21-27 40-50 44-24 4-49-7-63-27C1 87-3 59 8 38 19 18 44 5 70 5Z" />
          </clipPath>
        </defs>
        <g className="wg-footer-logo__bob">
          <g clipPath="url(#wg-footer-globe-clip)">
            <path
              d="M70 5c21 0 45 7 56 23 11 17 11 42 2 62-9 21-27 40-50 44-24 4-49-7-63-27C1 87-3 59 8 38 19 18 44 5 70 5Z"
              fill="#76bed0"
            />
            <path d="M-5 63c15-14 31-18 50-15l-7 30 18 12-10 38c-20-5-39-21-49-39Z" fill="#22a6bd" />
            <path d="M63 17 94 9l29 14 7 32-16 20-24-10-5-28-23-2Z" fill="#b7d7dc" />
            <path d="M24 27 53 12l42 8-33 14 4 25-36 10-22-24Z" fill="#6bb7c8" />
            <path d="M75 79 101 68l33 16-13 33-41 17-13-27Z" fill="#22a6bd" />
            <path d="M47 20 70 17l-7 13-27 5Z" fill="#3f963a" />
            <path d="M32 54 54 39l33 5 3 19-31 17-32-2Z" fill="#3f963a" />
            <path d="M90 30 112 22l23 22-19 24-27-9Z" fill="#3f963a" />
            <path d="M116 62 146 47l8 45-30 14Z" fill="#559846" />
            <path d="M5 81 26 67l19 18-4 27-25-6Z" fill="#559846" />
            <path d="M64 94 84 101l4 30-35-5Z" fill="#559846" />
            <path
              className="wg-footer-logo__shine"
              d="M30 16 124 112"
              fill="none"
              stroke="#ffffff"
              strokeLinecap="round"
              strokeWidth="13"
            />
          </g>
          <path
            d="M70 5c21 0 45 7 56 23 11 17 11 42 2 62-9 21-27 40-50 44-24 4-49-7-63-27C1 87-3 59 8 38 19 18 44 5 70 5Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="5"
          />
          <g className="wg-footer-logo__type" fill="#fff">
            <text x="70" y="66" textAnchor="middle" fontSize="35" transform="skewX(-8)">
              WORLD
            </text>
            <text x="70" y="96" textAnchor="middle" fontSize="32" transform="skewX(7)">
              G3NIUS
            </text>
          </g>
        </g>
      </svg>
    </span>
  );
}
