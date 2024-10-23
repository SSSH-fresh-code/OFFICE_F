import useSsshStore from "@/lib/store/sssh.store";
import { createFileRoute } from "@tanstack/react-router";
import { lazy } from "react";

const ChatbotNewForm = lazy(
	() => import("@/components/custom-ui/chat/bot/chatbot-new-form"),
);
export const Route = createFileRoute("/chatbot/new/")({
	beforeLoad: () => {
		useSsshStore.getState().setTitle("");
	},
	component: () => <ChatbotNewForm />,
});
