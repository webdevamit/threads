"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/app/core/button";

export default function BackButton() {
  const router = useRouter();

  return (
    <Button onClick={() => router.back()} className="pl-2.5" variant="ghost">
      <ChevronLeft className="w-4 h-4 mr-1" /> Back
    </Button>
  );
}
