import ChatLogDetailForm from "@/components/custom-ui/chat/chat-log-detail-form";
import { readLogApi, readLogKey } from "@/lib/api/log-api";
import useSsshStore from "@/lib/store/sssh.store";
import { queryOptions } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/chat/log/$id/")({
	beforeLoad: () => {
		useSsshStore.getState().setTitle("");
	},
	loader: async ({ params, context: { queryClient } }) => {
		const queryOption = queryOptions({
			queryKey: readLogKey(params.id),
			queryFn: () => readLogApi(params.id),
			staleTime: 0,
		});

		return await queryClient.fetchQuery(queryOption);
	},
	component: () => <ChatLogDetailForm />,
});
