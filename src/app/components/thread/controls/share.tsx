"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/core/dropdown-menu";
import { Link, Send, Share } from "lucide-react";
import { toast } from "react-hot-toast";

export default function ShareButton({
  post,
  name,
}: {
  post: string;
  name: string;
}) {
  const shareData = {
    title: "Threads",
    text: "Link to " + name + "'s post on Threads",
    url: "http://localhost:3000/thread/" + post,
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {" "}
        <Send className="w-[18px] h-[18px]" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();
            navigator.clipboard.writeText(shareData.url);
            toast.success("Copied to clipboard");
          }}
        >
          {" "}
          <Link className="mr-2 h-4 w-4" />
          Copy Link
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();
            navigator.share(shareData);
          }}
        >
          {" "}
          <Share className="mr-2 h-4 w-4" />
          Share Via...
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
