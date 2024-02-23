import Prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import Link from "next/link";
import Item from "../components/thread/item";
import { fetchUser } from "../actions/user";

export default async function ProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const clerkUser = await currentUser();

  if (!clerkUser) return null;

  const user = await fetchUser(params.id);

  const posts = await Prisma.post.findMany({
    where: {
      authorId: user?.id,
      parent: null,
    },
    include: {
      author: true,
      children: {
        include: {
          author: true,
        },
      },
      parent: true,
      likes: true,
    },
  });

  return (
    <>
      <div className="w-full mt-4 flex">
        <button className="w-full h-10 py-2 font-semibold border-b border-b-white text-center">
          Threads
        </button>
        <Link
          href={`/${params.id}/replies`}
          className="w-full h-10 py-2 font-medium border-b border-neutral-900 duration-200 hover:border-neutral-700 hover:text-neutral-500 text-center text-neutral-600"
        >
          Replies
        </Link>
      </div>
      {posts.length === 0 ? (
        <div className="text-neutral-600 mt-4 text-center leading-loose">
          No threads posted yet.
        </div>
      ) : (
        posts.map((post) => (
          <Item currentUserId={clerkUser.id} data={post} key={post.id} />
        ))
      )}
    </>
  );
}
