import ChatLogList from "@/components/custom-ui/chat/chat-logt-list";
import { readLogsApi, readLogsKey } from "@/lib/api/log-api";
import PAGE_TITLE from "@/lib/const/page-title.const";
import useSsshStore from "@/lib/store/sssh.store";
import { queryOptions } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { BusinessType, DataType } from "sssh-library";

export const Route = createFileRoute("/chat/log/")({
	beforeLoad: () => {
		useSsshStore.getState().setTitle(PAGE_TITLE["/chat/log"]);
	},
	validateSearch: (search: Record<string, unknown>) => {
		const result: Record<string, unknown> & {
			where__businessType: string;
			where__dataType: string;
		} = {
			page: Number(search.page ?? 1),
			take: 20,
			orderby: "logDate",
			direction: "desc",
			where__businessType: BusinessType.CHAT,
			where__dataType: DataType.JSON,
		};

		return result;
	},
	loaderDeps: ({ search }) => search,
	loader: async ({ deps, context: { queryClient } }) => {
		const keys = readLogsKey(deps);

		const logsQueryOptions = queryOptions({
			queryKey: keys,
			queryFn: () => readLogsApi(deps),
			staleTime: 0,
		});

		return await queryClient.fetchQuery(logsQueryOptions);
	},
	component: () => <ChatLogList />,
});
