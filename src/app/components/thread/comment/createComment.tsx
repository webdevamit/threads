"use client";

import { Loader2 } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { toast } from "react-hot-toast";
import { ExtendedThread } from "@/types";
import { Button } from "@/app/core/button";
import { replyToThread } from "@/app/actions/threads";
import UserAvatar from "../../profile/user-avatar";

export function Create({
  itemData,
  setOpen,
}: {
  itemData: ExtendedThread;
  setOpen: (open: boolean) => void;
}) {
  const [comment, setComment] = useState("");
  const [clicked, setClicked] = useState(false);

  const { isSignedIn, isLoaded, user } = useUser();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();

  useEffect(() => {
    if (clicked && !isPending) {
      setComment("");
      setOpen(false);
      setClicked(false);
      toast("Replied to thread");
    }
  }, [isPending, clicked, setOpen]);

  if (!isLoaded || !isSignedIn) return null;

  return (
    <div>
      <div className="space-x-2 flex font-light">
        <div className="flex flex-col items-center justify-start">
          <UserAvatar
            src={user.imageUrl}
            name={user.fullName ? user.fullName : user.firstName ?? ""}
          />
          <div className="w-0.5 grow mt-2 rounded-full bg-muted " />
        </div>
        <div className="w-full">
          <div className="font-semibold text-left">Me</div>
          <textarea
            value={comment}
            onChange={(e) => {
              if (e.target.value.length > 200) return;
              setComment(e.target.value);
            }}
            className="mt-1 mini-scrollbar text-base/relaxed resize-none h-16 bg-transparent w-full placeholder:text-muted-foreground pb-1 outline-none focus:border-b border-b-neutral-700"
            placeholder={`Reply to ${itemData?.author?.name ?? ""}...`}
          />
          <div className="mt-1 text-end font-medium text-xs text-muted-foreground">
            {comment.length}/200
          </div>
          {/* for adding attachments in the future */}
          {/* <Paperclip className="w-[18px] h-[18px] mt-3" /> */}
        </div>
      </div>
      <Button
        disabled={comment.length === 0}
        variant="outline"
        className="w-full mt-4"
        onClick={() => {
          startTransition(() =>
            replyToThread(comment, user.id, itemData.id, pathname)
          );
          setClicked(true);
        }}
      >
        {isPending ? (
          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
        ) : (
          "Post"
        )}
      </Button>
      {/* <div className="flex justify"></div> */}
    </div>
  );
}
