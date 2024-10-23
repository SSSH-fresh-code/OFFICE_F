import { readChatsApi, readChatsKey } from "@/lib/api/chat-api";
import PAGE_TITLE from "@/lib/const/page-title.const";
import useSsshStore from "@/lib/store/sssh.store";
import { queryOptions } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { lazy } from "react";
import { MessengerType } from "sssh-library";
const ChatList = lazy(() => import("@/components/custom-ui/chat/chat-list"));

export const Route = createFileRoute("/chat/")({
	beforeLoad: () => {
		useSsshStore.getState().setTitle(PAGE_TITLE["/chat"]);
	},
	validateSearch: (search: Record<string, unknown>) => {
		const result: Record<string, unknown> = {
			page: Number(search.page ?? 1),
			take: Number(search.take ?? 10),
			orderby: search.oderby ? String(search.orderby) : "createdAt",
			direction: search.direction ? String(search.direction) : "desc",
		};

		if (search.where__type) result.where__type = search.where__type;
		else result.where__type = MessengerType.DISCORD;

		return result;
	},
	loaderDeps: ({ search }) => search,
	loader: async ({ deps, context: { queryClient } }) => {
		const keys = readChatsKey(deps);

		const chatsQueryOptions = queryOptions({
			queryKey: keys,
			queryFn: () => readChatsApi(deps),
		});

		return await queryClient.fetchQuery(chatsQueryOptions);
	},
	component: () => <ChatList />,
});
