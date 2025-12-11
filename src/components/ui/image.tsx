"use client";
import Image from "next/image";
import { ComponentProps, useState } from "react";
import { ImageOff, LucideProps } from "lucide-react";
import { cn } from "@/lib/utils";

type ImageWithFallbackProps = Omit<
  React.ComponentProps<typeof Image>,
  "src"
> & {
  src: string | null;
  iconProps?: Partial<LucideProps>;
  textProps?: ComponentProps<"span">;
};

export function ImageWithFallback({
  src,
  alt,
  iconProps,
  textProps,
  ...props
}: ImageWithFallbackProps) {
  const [imageError, setImageError] = useState(false);

  // Show fallback if src is null or empty, or if image fails to load
  const showFallback = !src || imageError;

  return showFallback ? (
    <div className="w-full h-full bg-muted flex flex-col items-center justify-center text-muted-foreground">
      <ImageOff
        className={cn("size-8 mb-2 opacity-50", iconProps?.className)}
        {...iconProps}
      />
      <span
        className={cn("text-sm font-medium", textProps?.className)}
        {...textProps}
      >
        {!src ? "No Image" : "Failed to load"}
      </span>
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
