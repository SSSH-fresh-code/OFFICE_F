import { readChatApi, readChatKey } from "@/lib/api/chat-api";
import useSsshStore from "@/lib/store/sssh.store";
import { queryOptions } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { lazy } from "react";
const ChatDetailForm = lazy(
	() => import("@/components/custom-ui/chat/chat-detail-form"),
);

export const Route = createFileRoute("/chat/$id/")({
	beforeLoad: () => {
		useSsshStore.getState().setTitle("");
	},
	loader: async ({ params, context: { queryClient } }) => {
		const id = Number(params.id);

		const queryOption = queryOptions({
			queryKey: readChatKey(id),
			queryFn: () => readChatApi(id),
			staleTime: Number.POSITIVE_INFINITY,
		});

		return await queryClient.fetchQuery(queryOption);
	},
	component: () => <ChatDetailForm />,
});
