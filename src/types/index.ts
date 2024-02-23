import { Likes, Post, Prisma, User } from "@prisma/client";

export interface UserData {
  id: string;
  username: string;
  name: string;
  bio: string;
  image: string;
}

export type ExtendedThread = Prisma.PostGetPayload<{
  include: {
    likes: true;
    author: true;
    parent: true;
    children: {
      include: {
        author: true;
        children: true;
        parent: true;
        likes: true;
      };
    };
  };
}>;

export interface ExtendedUser extends ExtendedThread {
  clerkId: string;
}

export interface ThreadWithUsers extends Post {
  author: ExtendedUser;
}
