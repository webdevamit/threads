import { fetchThreadById } from "@/app/actions/threads";
import Item from "@/app/components/thread/item";
import MainItem from "@/app/components/thread/main";
import { Button } from "@/app/core/button";
import { currentUser } from "@clerk/nextjs";
import { ArrowUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// export async function generateStaticParams() {
//   const posts = await db.query.threads.findMany();

//   return posts.map((post) => ({
//     id: String(post.id),
//   }));
// }

export default async function ThreadPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const user = await currentUser();
  const post = await fetchThreadById(id);

  if (!post) {
    return <div className="text-center text-neutral-600">Post not found.</div>;
  }

  return (
    <>
      {post?.parent && post?.parent?.parent ? (
        <Link href={"/thread/" + post?.parent?.parentId}>
          <Button
            size="sm"
            variant="ghost"
            className="flex pl-2 text-neutral-600"
          >
            <ArrowUp className="w-4 h-4 mr-2" />
            <div className="overflow-hidden rounded-full h-4 w-4 mr-2 bg-neutral-600">
              <Image
                src={post?.parent?.parent?.author?.image}
                alt={post.parent?.parent?.author?.name + "'s avatar"}
                width={16}
                height={16}
              />
            </div>
            See earlier reply
          </Button>
        </Link>
      ) : null}
      {post?.parent ? (
        <Item
          key={post?.parent?.id}
          currentUserId={user?.id}
          parent
          data={post?.parent}
        />
      ) : null}
      <MainItem key={post.id} currentUserId={user?.id} data={post} />
      {post.children.map((child) => (
        <Item key={child.id} currentUserId={user?.id} data={child} />
      ))}
    </>
  );
}
