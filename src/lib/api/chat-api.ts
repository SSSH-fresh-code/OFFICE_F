import type { MessengerType, Page, ReadChatDto } from "sssh-library";
import { req } from "../api";

/**
 * 채팅방 - get /chat keys
 * @param MessengerType type
 */
export const readChatAllByTypeKey = (type: MessengerType) => [
	"chat",
	"all",
	type,
];

/**
 * 챗봇 조회 - get /chat/bot
 * @param readChatbotsKey params
 */
export const readChatAllByTypeApi = (type: MessengerType) =>
	req<Page<ReadChatDto>>("chat", "get", {
		page: 1,
		take: 9999,
		orderby: "name",
		direction: "asc",
		where__type: type,
	});
