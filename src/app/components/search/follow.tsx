"use client";

import { useTransition } from "react";
import { toast } from "react-hot-toast";
import { followUser, unfollowUser } from "@/app/actions/user";
import { Loader2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "@/app/core/button";

export default function FollowButton({
  isFollowing,
  name,
  id,
  followingId,
}: {
  isFollowing: boolean;
  name: string;
  id: string;
  followingId: string;
}) {
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();

  return (
    <Button
      onClick={(e) => {
        e.preventDefault();
        toast.success(isFollowing ? "Unfollowed " + name : "Followed " + name);
        startTransition(() => {
          if (isFollowing) {
            unfollowUser(id, followingId, pathname);
          } else {
            followUser(id, followingId, pathname);
          }
        });
      }}
      variant="outline"
      size="sm"
      className="w-24"
    >
      {isPending ? (
        <Loader2 className="animate-spin w-4 h-4" />
      ) : isFollowing ? (
        "Following"
      ) : (
        "Follow"
      )}
    </Button>
  );
}
