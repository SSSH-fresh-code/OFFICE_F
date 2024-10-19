import { Route } from "@/routes/chat/index.route";
import { useEffect, useState } from "react";
import type { Page, ReadChatDto } from "sssh-library";
import ChatDataTable from "./chat-data-table";

function ChatList() {
	const { success, data } = Route.useLoaderData();

	const [chats, setChats] = useState<Page<ReadChatDto>>();

	useEffect(() => {
		if (success && data) {
			setChats(data);
		}
	}, [success, data]);

	return <ChatDataTable chats={chats} />;
}

export default ChatList;
