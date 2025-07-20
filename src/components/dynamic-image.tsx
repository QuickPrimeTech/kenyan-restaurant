"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState, useEffect } from "react";

type DynamicImageProps = {
  images: string[];
};

export function DynamicImage({ images }: DynamicImageProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <>
      {images.map((src, i) => (
        <Image
          key={i}
          src={src}
          alt={`Background ${i}`}
          fill
          className={cn(
            "object-cover transition-opacity duration-1000 absolute inset-0",
            {
              "opacity-0": i !== current,
              "opacity-100": i === current,
            }
          )}
          priority={i === 0}
        />
      ))}
    </>
  );
}
