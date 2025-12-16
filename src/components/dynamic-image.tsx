"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState, useEffect } from "react";

type HeroImage = {
  image_url: string;
  lqip: string;
};
type DynamicImageProps = {
  images: HeroImage[];
};

export function DynamicImage({ images }: DynamicImageProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <>
      {images.map((image, i) => (
        <Image
          key={i}
          src={image.image_url}
          alt={`Background ${i}`}
          fill
          placeholder="blur"
          blurDataURL={image.lqip}
          sizes="100vw"
          className={cn(
            "object-cover transition-opacity duration-1000 absolute inset-0",
            {
              "opacity-0": i !== current,
              "opacity-100": i === current,
            }
          )}
          quality={i === current ? 85 : 30} // Lower quality for non-active images
          priority={i === 0}
          loading={i === 0 ? "eager" : "lazy"}
        />
      ))}
    </>
  );
}
