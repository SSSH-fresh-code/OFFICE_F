import { req } from "@/lib/api";
import useSsshStore from "@/lib/store/sssh.store";
import { queryOptions } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import type { ReadPostDto, ReadSeriesDto, ReadTopicDto } from "sssh-library";
import { lazy } from "react";

const PostDetailForm = lazy(
	() => import("@/components/custom-ui/post/post-detail-form"),
);

export const Route = createFileRoute("/post/$title/")({
	beforeLoad: () => {
		useSsshStore.getState().setTitle("");
	},
	loader: async ({ params, context: { queryClient } }) => {
		queryClient.invalidateQueries({ queryKey: ["optionForSelect"] });

		const postQueryOptions = queryOptions({
			queryKey: ["post", String(params.title)],
			queryFn: () => req<ReadPostDto>(`post/${params.title}`, "get"),
		});

		const post = await queryClient.ensureQueryData(postQueryOptions);

		const topicQueryOptions = queryOptions({
			queryKey: ["topicForSelect"],
			queryFn: () =>
				req<Pick<ReadTopicDto, "name" | "id">[]>(`topic/all`, "get"),
		});

		const seriesQueryOptions = queryOptions({
			queryKey: ["optionForSelect", post.data?.topic.id],
			queryFn: () =>
				req<Pick<ReadSeriesDto, "name" | "id">[]>(
					`series/all/${post.data?.topic.id}`,
					"get",
				),
		});

		const series = await queryClient.ensureQueryData(seriesQueryOptions);
		const topics = await queryClient.ensureQueryData(topicQueryOptions);

		return { post, series, topics };
	},
	component: () => <PostDetailForm />,
});
