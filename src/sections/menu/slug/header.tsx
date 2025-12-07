import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export function Header() {
  return (
    <Button asChild variant="link" className="mb-8">
      <Link href={"/menu"}>
        <ArrowLeft />
        Back to Menu
      </Link>
    </Button>
  );
}
