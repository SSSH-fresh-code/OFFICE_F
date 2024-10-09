import { lazy, useEffect, useState } from "react";
import type { Page, ReadPostDto } from "sssh-library";
import { Route } from "@/routes/post/index.route";

const PostDataTable = lazy(() => import("./post-data-table"));

function PostList() {
	const { success, data } = Route.useLoaderData();
	const { where__topicId, where__seriesId, where__authorName } =
		Route.useLoaderDeps();

	const isFilltering =
		!!where__topicId || !!where__seriesId || !!where__authorName;

	const [posts, setPosts] = useState<Page<ReadPostDto>>();

	useEffect(() => {
		if (success && data) {
			setPosts(data);
		}
	}, [success, data]);

	return <PostDataTable posts={posts} isFiltering={isFilltering} />;
}

export default PostList;
