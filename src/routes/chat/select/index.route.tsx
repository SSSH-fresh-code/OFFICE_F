import { createFileRoute } from "@tanstack/react-router";
import { lazy } from "react";

const ChatSelect = lazy(
	() => import("@/components/custom-ui/chat/chat-select"),
);
export const Route = createFileRoute("/chat/select/")({
	component: () => <ChatSelect />,
});
