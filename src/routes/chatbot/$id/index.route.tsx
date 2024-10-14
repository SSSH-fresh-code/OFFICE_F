import ChatbotDetailForm from "@/components/custom-ui/chat/bot/chatbot-detail-form";
import { req } from "@/lib/api";
import useSsshStore from "@/lib/store/sssh.store";
import { createFileRoute } from "@tanstack/react-router";
import type { ReadChatBotDto } from "sssh-library";

export const Route = createFileRoute("/chatbot/$id/")({
	beforeLoad: () => {
		useSsshStore.getState().setTitle("");
	},
	loader: async ({ params }) => {
		return await req<ReadChatBotDto>(`chat/bot/${params.id}`, "get");
	},
	component: () => <ChatbotDetailForm />,
	staleTime: 0,
});
