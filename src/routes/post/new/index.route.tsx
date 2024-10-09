import { req } from "@/lib/api";
import { PAGE_TITLE } from "@/lib/const/page-title.const";
import useSsshStore from "@/lib/store/sssh.store";
import { queryOptions } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import type { ReadTopicDto } from "sssh-library";
import { lazy } from "react";

const PostNewForm = lazy(
	() => import("@/components/custom-ui/post/post-new-form"),
);

export const Route = createFileRoute("/post/new/")({
	beforeLoad: () => {
		useSsshStore.getState().setTitle(PAGE_TITLE["/post/new"]);
	},
	loader: async ({ context: { queryClient } }) => {
		queryClient.invalidateQueries({ queryKey: ["optionForSelect"] });

		const topicQueryOptions = queryOptions({
			queryKey: ["topicForSelect"],
			queryFn: () =>
				req<Pick<ReadTopicDto, "name" | "id">[]>(`topic/all`, "get"),
		});

		const topics = await queryClient.ensureQueryData(topicQueryOptions);

		return topics;
	},
	component: () => <PostNewForm />,
});
