"use client";

import React, { useEffect, useState } from "react";
import { TERipple } from "tw-elements-react";

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

const PostsPage: React.FC = () => {
  const [data, setData] = useState<Post[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setIsLoading(false);
      });
  }, []);

  if (isLoading)
    return (
      <p className="w-full h-auto text-center font-medium text-2xl mt-48">
        Loading...
      </p>
    );
  if (!data)
    return <p className="text-red-600 font-medium text-2xl">No data</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 p-8">
      {data.map((post) => (
        <div
          key={post.id}
          className="block rounded-lg border shadow-md bg-white p-6 text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white"
        >
          <h5 className="mb-2 text-xl font-medium leading-tight pb-2 border-b">
            {post.title}
          </h5>
          <p className="mb-4 text-base">{post.body}</p>
          <TERipple>
            <button
              type="button"
              className="inline-block rounded bg-blue-600 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-blue-500 hover:shadow-blue-200 focus:bg-blue-300 focus:shadow-blue-200 focus:outline-none focus:ring-0 active:bg-blue-600 active:shadow-blue-200 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
              data-twe-ripple-init
              data-twe-ripple-color="light"
            >
              Read More
            </button>
          </TERipple>
        </div>
      ))}
    </div>
  );
};

export default PostsPage;
