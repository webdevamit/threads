"use client";

import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

import { useInView } from "react-intersection-observer";
import Item from "./item";
import { ExtendedThread } from "@/types";
import { loadMoreThreads } from "@/app/actions/threads";

export default function HomePosts({
  posts,
  user,
}: {
  posts: ExtendedThread[];
  user: string;
}) {
  const [items, setItems] = useState(posts);
  const [noMore, setNoMore] = useState(false);
  const [loading, setLoading] = useState(false);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && !noMore) {
      setLoading(true);
      loadMore();
      console.log("LOADING MORE");
    }
  }, [inView, noMore]);

  useEffect(() => {
    setItems(posts);
  }, [posts]);

  const loadMore = async () => {
    const morePosts = await loadMoreThreads(items.length);

    if (morePosts.length === 0) {
      setNoMore(true);
    }

    // setItems([...items, ...morePosts]);
    setLoading(false);
  };

  return (
    <>
      {items.map((item, i) => {
        if (i === items.length - 1)
          return (
            <div key={item.id} ref={ref}>
              <Item currentUserId={user} posts={items} data={item} />
            </div>
          );
        return (
          <Item key={item.id} posts={items} currentUserId={user} data={item} />
        );
      })}
      <div className="w-full py-4 flex justify-center">
        {items.length === 0 ? (
          <div className="text-muted-foreground mt-4 text-center leading-loose">
            There are no threads... <br />
            Try making one!
          </div>
        ) : null}

        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
        ) : null}
      </div>
    </>
  );
}
