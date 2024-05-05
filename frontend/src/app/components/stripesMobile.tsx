"use client";

import { useEffect, useState } from "react";

export default function Stripes() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="absolute bg-white top-0 left-0 -z-1 w-screen h-screen">
      <svg
        width="100%"
        height="100%"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {Array.from({ length: window.innerWidth / 16 }).map((_, index) => {
          return (
            <rect
              key={index}
              x={index * 16 + 4}
              y="0"
              width="2"
              height="100%"
              fill="#D9D9D9"
            />
          );
        })}
      </svg>
    </div>
  );
}
