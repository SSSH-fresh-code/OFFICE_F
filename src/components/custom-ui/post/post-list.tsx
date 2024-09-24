import { useEffect, useState } from "react";
import { Page, ReadPostDto } from "sssh-library";
import PostDataTable from "./post-data-table";
import { Route } from "@/routes/post/index.route";

function PostList() {
  const { success, data } = Route.useLoaderData();

  const [posts, setPosts] = useState<Page<ReadPostDto>>();

  useEffect(() => {
    if (success && data) {
      setPosts(data);
    }
  }, [success, data])


  return (
    <PostDataTable posts={posts} />
  );
}

export default PostList;
