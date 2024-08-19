import React from "react";
import UserPage from "./users/page";
import Header from "../Header/pages";
import PostsPage from "./posts/page";
import PhotoPage from "@/app/photos/page";

const HomePage: React.FC = () => {
  return (
    <>
      <Header />
      <h1 className="text-center font-semibold text-3xl mt-4">Server Component</h1>
      {/* <UserPage />
      {/* <h1 className="text-center font-semibold text-3xl mt-4">Client Component</h1>
      <PostsPage /> */} 
      <PhotoPage />
    </>
  );
};

export default HomePage;
