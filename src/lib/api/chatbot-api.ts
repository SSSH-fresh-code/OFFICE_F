import type { Page, ReadChatBotDto } from "sssh-library";
import { req } from "../api";

/**
 * 챗봇 생성 - Post /chat/bot
 * @param body object
 */
export const createChatbotApi = (body: object) =>
	req<ReadChatBotDto>("chat/bot", "post", body);

/**
 * 챗봇 생성 - Put /chat/bot
 * @param body object
 */
export const updateChatbotApi = (body: object) =>
	req<void>("chat/bot", "put", body);

/**
 * 챗봇 - get /chat/bot keys
 * @param Record<string, unknown> & { where__type?: string } params
 */
export const readChatbotsKey = (
	params: Record<string, unknown> & { where__type?: string },
) => [
	"chatbot",
	"list",
	params.page,
	params.take,
	params.direction,
	params.orderby,
	params.where__type,
];

/**
 * 챗봇 조회 - get /chat/bot
 * @param readChatbotsKey params
 */
export const readChatbotsApi = (
	params: Record<string, unknown> & { where__type?: string },
) => req<Page<ReadChatBotDto>>("chat/bot", "get", params);

/**
 * 챗봇 - get /chat/bot/${id} keys
 * @param Record<string, unknown> & { where__type?: string } params
 */
export const readChatbotKey = (id: number) => ["chatbot", "single", id];

/**
 * 챗봇 조회 - get /chat/bot
 * @param readChatbotsKey params
 */
export const readChatbotApi = (id: number) =>
	req<ReadChatBotDto>(`chat/bot/${id}`, "get");
