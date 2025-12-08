"use client";
import { useState } from "react";
import { Button } from "./ui/button";

export function ClampedReview({ children }: { children: string }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <p
        className={`mb-4 italic transition-all ${
          expanded ? "" : "line-clamp-4"
        }`}
      >
        &quot;{children}&quot;
      </p>
      {children.split(" ").length > 20 && (
        <Button
          variant="link"
          size={"sm"}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "See less" : "See more"}
        </Button>
      )}
    </>
  );
}
