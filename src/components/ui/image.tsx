"use client";

import Image from "next/image";
import { useState } from "react";
import { ImageOff } from "lucide-react";

type ImageWithFallbackProps = Omit<
  React.ComponentProps<typeof Image>,
  "src"
> & {
  src: string | null;
};

export function ImageWithFallback({
  src,
  alt,
  ...props
}: ImageWithFallbackProps) {
  const [imageError, setImageError] = useState(false);

  // Show fallback if src is null or empty, or if image fails to load
  const showFallback = !src || imageError;

  return showFallback ? (
    <div className="w-full h-full bg-muted flex flex-col items-center justify-center text-muted-foreground">
      <ImageOff className="w-8 h-8 mb-2 opacity-50" />
      <span className="text-sm font-medium">No Image</span>
    </div>
  ) : (
    <Image
      src={src as string}
      alt={alt || "Image"}
      {...props}
      onError={() => setImageError(true)}
    />
  );
}
