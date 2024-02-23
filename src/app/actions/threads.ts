"use server";

import Prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// export async function fetchPosts(pageNumber = 1, pageSize = 20) {
//   // Calculate the number of posts to skip based on the page number and page size.
//   const skipAmount = (pageNumber - 1) * pageSize;

//   // Create a query to fetch the posts that have no parent (top-level threads) (a thread that is not a comment/reply).
//   const postsQuery = Prisma.post
//     .findMany({
//       where: {
//         parentId: { $in: [null, undefined] },
//       },
//     })
//     .sort({ createdAt: "desc" })
//     .skip(skipAmount)
//     .limit(pageSize)
//     .populate({
//       path: "author",
//       model: User,
//     })
//     .populate({
//       path: "community",
//       model: Community,
//     })
//     .populate({
//       path: "children", // Populate the children field
//       populate: {
//         path: "author", // Populate the author field within children
//         model: User,
//         select: "_id name parentId image", // Select only _id and username fields of the author
//       },
//     });

//   // Count the total number of top-level posts (threads) i.e., threads that are not comments.
//   const totalPostsCount = await Thread.countDocuments({
//     parentId: { $in: [null, undefined] },
//   }); // Get the total count of posts

//   const posts = await postsQuery.exec();

//   const isNext = totalPostsCount > skipAmount + posts.length;

//   return { posts, isNext };
// }

export async function createThread(
  thread: string,
  author: string,
  path: string
) {
  try {
    await Prisma.post.create({
      data: {
        text: thread,
        author: {
          connect: {
            id: author,
          },
        },
      },
    });
    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to update thread: ${error.message}`);
  }
}

// async function fetchAllChildThreads(threadId: string): Promise<any[]> {
//   const childThreads = await Thread.find({ parentId: threadId });

//   const descendantThreads = [];
//   for (const childThread of childThreads) {
//     const descendants = await fetchAllChildThreads(childThread._id);
//     descendantThreads.push(childThread, ...descendants);
//   }

//   return descendantThreads;
// }

export async function replyToThread(
  text: string,
  authorId: string,
  threadId: string,
  path: string
) {
  await Prisma.post.create({
    data: {
      text: text,
      author: {
        connect: {
          id: authorId,
        },
      },
      parent: {
        connect: {
          id: threadId,
        },
      },
    },
  });

  revalidatePath(path);
}

export async function repostThread(
  id: string,
  reposterId: string,
  path: string
) {
  await Prisma.repost.create({
    data: {
      post: {
        connect: {
          id,
        },
      },
      reposter: {
        connect: {
          id: reposterId,
        },
      },
    },
  });

  revalidatePath(path);
}

export async function deleteThread(id: string, path: string) {
  // ! navigate back to home if on dedicated page for this thread & its deleted

  await Prisma.post.update({
    where: {
      id,
    },
    data: {
      likes: {
        deleteMany: {},
      },
      children: {
        deleteMany: {},
      },
    },
    include: {
      likes: true,
    },
  });

  await Prisma.post.delete({
    where: {
      id,
    },
  });

  revalidatePath(path);
}

export async function fetchThreadById(threadId: string) {
  try {
    const thread = await Prisma.post.findUnique({
      where: {
        id: threadId,
      },
      include: {
        author: true,
        children: {
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
        },
        parent: {
          include: {
            author: true,
            children: {
              include: {
                author: true,
              },
            },
            parent: {
              include: {
                author: true,
              },
            },
            likes: true,
          },
        },
        likes: true,
      },
    });

    return thread;
  } catch (err) {
    console.error("Error while fetching thread:", err);
    throw new Error("Unable to fetch thread");
  }
}

// export async function addCommentToThread(
//   threadId: string,
//   commentText: string,
//   userId: string,
//   path: string
// ) {
//   try {
//     // Find the original thread by its ID
//     const originalThread = await Thread.findById(threadId);

//     if (!originalThread) {
//       throw new Error("Thread not found");
//     }

//     // Create the new comment thread
//     const commentThread = new Thread({
//       text: commentText,
//       author: userId,
//       parentId: threadId, // Set the parentId to the original thread's ID
//     });

//     // Save the comment thread to the database
//     const savedCommentThread = await commentThread.save();

//     // Add the comment thread's ID to the original thread's children array
//     originalThread.children.push(savedCommentThread._id);

//     // Save the updated original thread to the database
//     await originalThread.save();

//     revalidatePath(path);
//   } catch (err) {
//     console.error("Error while adding comment:", err);
//     throw new Error("Unable to add comment");
//   }
// }

export async function likeThread(id: string, userId: string, path: string) {
  await Prisma.likes.create({
    data: {
      post: {
        connect: {
          id,
        },
      },
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });

  await Prisma.post.update({
    where: {
      id,
    },
    data: {
      likes: {
        connect: {
          postId_userId: {
            postId: id,
            userId,
          },
        },
      },
    },
  });

  revalidatePath(path);
}

export async function unlikeThread(id: string, userId: string, path: string) {
  await Prisma.likes.delete({
    where: {
      postId_userId: {
        postId: id,
        userId,
      },
    },
  });

  revalidatePath(path);
}

export async function loadMoreThreads(offset: number) {
  const posts = await Prisma.post.findMany({
    take: 10,
    skip: offset,
    where: { NOT: [{ parentId: null }] },
    orderBy: { createdAt: "desc" },
  });
  return posts;
}
