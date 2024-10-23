import { Route } from "@/routes/chatbot/index.route";
import { useEffect, useState } from "react";
import type { Page, ReadChatBotDto } from "sssh-library";
import ChatbotDataTable from "./chatbot-data-table";

function ChatbotList() {
	const { success, data } = Route.useLoaderData();

	const [chatbots, setChatbots] = useState<Page<ReadChatBotDto>>();

	useEffect(() => {
		if (success && data) {
			setChatbots(data);
		}
	}, [success, data]);

	return <ChatbotDataTable chatbots={chatbots} />;
}

export default ChatbotList;
