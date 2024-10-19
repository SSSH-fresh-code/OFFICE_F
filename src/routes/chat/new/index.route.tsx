import useSsshStore from "@/lib/store/sssh.store";
import { createFileRoute } from "@tanstack/react-router";
import { lazy } from "react";

const ChatNewForm = lazy(
	() => import("@/components/custom-ui/chat/chat-new-form"),
);

export const Route = createFileRoute("/chat/new/")({
	beforeLoad: () => {
		useSsshStore.getState().setTitle("");
	},
	component: () => <ChatNewForm />,
});
