import { req } from "@/lib/api";
import PAGE_TITLE from "@/lib/const/page-title.const";
import useSsshStore from "@/lib/store/sssh.store";
import { queryOptions } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { lazy } from "react";
import type { Page, ReadChatBotDto } from "sssh-library";
const ChatbotList = lazy(
	() => import("@/components/custom-ui/chat/bot/chatbot-list"),
);

export const Route = createFileRoute("/chatbot/")({
	beforeLoad: () => {
		useSsshStore.getState().setTitle(PAGE_TITLE["/chatbot"]);
	},
	validateSearch: (search: Record<string, unknown>) => ({
		page: Number(search.page ?? 1),
		where__type: search.where__type,
	}),
	loaderDeps: ({ search: { page, where__type } }) => {
		const dto: Record<string, unknown> = {
			page,
			take: 10,
			orderby: "createdAt",
			direction: "desc",
		};

		if (where__type !== "undefined" && where__type !== undefined) {
			dto["where__type"] = String(where__type);
		}

		return dto;
	},
	loader: async ({ deps, context: { queryClient } }) => {
		const postsQueryOptions = queryOptions({
			queryKey: ["topics", String(deps.page)],
			queryFn: () => req<Page<ReadChatBotDto>>("chat/bot", "get", deps),
			staleTime: 3000,
		});

		return await queryClient.ensureQueryData(postsQueryOptions);
	},
	component: () => <ChatbotList />,
});
