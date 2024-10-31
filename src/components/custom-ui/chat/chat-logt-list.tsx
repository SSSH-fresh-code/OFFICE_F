import { Route } from "@/routes/chat/log/index.route";
import { useEffect, useState } from "react";
import type { LogDto, Page } from "sssh-library";
import ChatLogDataTable from "./chat-log-data-table";

function ChatLogList() {
	const { success, data } = Route.useLoaderData();

	const [logs, setLogs] = useState<Page<LogDto>>();

	useEffect(() => {
		if (success && data) {
			setLogs(data);
		}
	}, [success, data]);

	return <ChatLogDataTable logs={logs} />;
}

export default ChatLogList;
