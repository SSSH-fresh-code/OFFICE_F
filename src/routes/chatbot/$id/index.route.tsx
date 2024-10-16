import ChatbotDetailForm from "@/components/custom-ui/chat/bot/chatbot-detail-form";
import { readChatbotApi, readChatbotKey } from "@/lib/api/chatbot-api";
import useSsshStore from "@/lib/store/sssh.store";
import { queryOptions } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/chatbot/$id/")({
	beforeLoad: () => {
		useSsshStore.getState().setTitle("");
	},
	loader: async ({ params, context: { queryClient } }) => {
		const id = Number(params.id);

		const queryOption = queryOptions({
			queryKey: readChatbotKey(id),
			queryFn: () => readChatbotApi(id),
			staleTime: Number.POSITIVE_INFINITY,
		});

		return await queryClient.fetchQuery(queryOption);
	},
	component: () => <ChatbotDetailForm />,
});
