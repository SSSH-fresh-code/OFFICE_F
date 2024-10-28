import ChatSend from "@/components/custom-ui/chat/chat-send";
import { readChatbotsApi, readChatbotsKey } from "@/lib/api/chatbot-api";
import useSsshStore from "@/lib/store/sssh.store";
import { queryOptions } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/chat/send/")({
	beforeLoad: () => {
		useSsshStore.getState().setTitle("");
	},
	loader: async ({ context: { queryClient } }) => {
		const result: Record<string, unknown> = {
			page: 1,
			take: 999,
			orderby: "type",
			direction: "asc",
		};
		const keys = readChatbotsKey(result);

		const botsQueryOptions = queryOptions({
			queryKey: keys,
			queryFn: () => readChatbotsApi(result),
		});

		return await queryClient.fetchQuery(botsQueryOptions);
	},
	component: () => <ChatSend />,
});
