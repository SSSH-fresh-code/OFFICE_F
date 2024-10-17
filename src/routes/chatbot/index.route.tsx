import { readChatbotsApi, readChatbotsKey } from "@/lib/api/chatbot-api";
import PAGE_TITLE from "@/lib/const/page-title.const";
import useSsshStore from "@/lib/store/sssh.store";
import { queryOptions } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { lazy } from "react";
const ChatbotList = lazy(
	() => import("@/components/custom-ui/chat/bot/chatbot-list"),
);

export const Route = createFileRoute("/chatbot/")({
	beforeLoad: () => {
		useSsshStore.getState().setTitle(PAGE_TITLE["/chatbot"]);
	},
	validateSearch: (search: Record<string, unknown>) => {
		const result: Record<string, unknown> = {
			page: Number(search.page ?? 1),
			take: Number(search.take ?? 10),
			orderby: search.oderby ? String(search.orderby) : "createdAt",
			direction: search.direction ? String(search.direction) : "desc",
		};

		if (search.where__type) result.where__type = search.where__type;

		return result;
	},
	loaderDeps: ({ search }) => search,
	loader: async ({ deps, context: { queryClient } }) => {
		const keys = readChatbotsKey(deps);

		const postsQueryOptions = queryOptions({
			queryKey: keys,
			queryFn: () => readChatbotsApi(deps),
		});

		return await queryClient.fetchQuery(postsQueryOptions);
	},
	component: () => <ChatbotList />,
});
