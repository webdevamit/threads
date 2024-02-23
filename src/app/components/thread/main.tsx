// import Image from "next/image";

import { ExtendedThread } from "@/types";
import Link from "next/link";
import Controls from "./controls";
import MoreMenu from "./moreMenu";
import UserAvatar from "../profile/user-avatar";

export default function MainItem({
  key,
  data,
  comment = false,
}: {
  key: string;
  data: ExtendedThread;
  comment?: boolean;
}) {
  return (
    <div className="px-3 py-4 space-y-3 flex flex-col border-b font-light border-neutral-900">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <UserAvatar src={data?.author?.image} name={data?.author?.name} />
          <Link href={`/${data?.author?.username}`} className="font-semibold">
            {data?.author?.name}
          </Link>
        </div>
        <div className="flex items-center space-x-2">
          <MoreMenu
            name={data?.author?.name}
            id={data.id}
            author={data?.author?.clerkId}
          />
        </div>
      </div>
      <div className="w-full">
        <div className="text-base/relaxed text-left mb-1">{data.text}</div>
        <Controls
          numPosts={data?.children ? data.children.length : -1}
          data={data}
        />
        <div className="flex text-muted-foreground items-center space-x-2">
          {data.replies && (
            <div>
              {data.replies.length}{" "}
              {data.replies.length === 1 ? "reply" : "replies"}
            </div>
          )}
          {data.likes && data.replies && (
            <div className="w-1 h-1 rounded-full " />
          )}
          {data.likes && data.likes.length > 0 ? (
            <div>
              {data.likes.length} {data.likes.length === 1 ? "like" : "likes"}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
