import { req } from "@/lib/api";
import { queryOptions } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import type { ReadTopicDto } from "sssh-library";
import useSsshStore from "@/lib/store/sssh.store";
import { lazy } from "react";

const TopicDetailForm = lazy(
	() => import("@/components/custom-ui/topic/topic-detail-form"),
);

export const Route = createFileRoute("/topic/$name/")({
	beforeLoad: () => {
		useSsshStore.getState().setTitle("");
	},
	loader: async ({ params, context: { queryClient } }) => {
		const postQueryOptions = queryOptions({
			queryKey: ["topic", String(params.name)],
			queryFn: () => req<ReadTopicDto>(`topic/${params.name}`, "get"),
		});

		return await queryClient.ensureQueryData(postQueryOptions);
	},
	component: () => <TopicDetailForm />,
});
