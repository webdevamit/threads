"use client";

import { repostThread } from "@/app/actions/threads";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/core/dropdown-menu";
import { MessageSquareDashed, Repeat2 } from "lucide-react";
import { toast } from "react-hot-toast";

export default function Repost({
  id,
  reposterId,
  path,
}: {
  id: string;
  reposterId: string;
  path: string;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        {" "}
        <Repeat2 className="w-5 h-5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();
            repostThread(id, reposterId, path);
            toast.success("Reposted thread");
          }}
        >
          {" "}
          <Repeat2 className="mr-2 h-4 w-4" />
          Repost
        </DropdownMenuItem>
        <DropdownMenuItem>
          {" "}
          <MessageSquareDashed className="mr-2 h-4 w-4" />
          Quote
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
