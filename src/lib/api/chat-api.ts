import type {
	MessengerType,
	Page,
	ReadChatDto,
	SendResultDto,
} from "sssh-library";
import { req } from "../api";

/**
 * 채팅방 목록 조회 키 생성 - get /chat
 *
 * 주어진 메신저 타입에 따라 모든 채팅방의 조회 키를 생성합니다.
 * 캐싱을 위한 키로 사용될 수 있습니다.
 *
 * @param {MessengerType} type - 조회할 채팅방의 메신저 타입
 */
export const readChatAllByTypeKey = (type: MessengerType) => [
	"chat",
	"all",
	type,
];

/**
 * 채팅방 목록 조회 API - get /chat
 *
 * 주어진 메신저 타입에 따른 모든 채팅방을 조회하는 API 요청을 만듭니다.
 *
 * @param {MessengerType} type - 조회할 채팅방의 메신저 타입
 */
export const readChatAllByTypeApi = (type: MessengerType) =>
	req<Page<ReadChatDto>>("chat", "get", {
		page: 1,
		take: 9999,
		orderby: "name",
		direction: "asc",
		where__type: type,
	});

/**
 * 채팅방 생성 API - Post /chat
 *
 * 새로운 채팅방을 생성하는 API 요청을 만듭니다.
 *
 * @param {object} body - 생성할 채팅방의 데이터 객체
 */
export const createChatApi = (body: object) =>
	req<ReadChatDto>("chat", "post", body);

/**
 * 채팅방 삭제 API - Delete /chat
 *
 * 주어진 ID에 해당하는 채팅방을 삭제하는 API 요청을 만듭니다.
 *
 * @param {number} id - 삭제할 채팅방의 고유 ID
 */
export const deleteChatApi = (id: number) =>
	req<ReadChatDto>(`chat/${id}`, "delete");

/**
 * 채팅방 목록 조회 키 생성 - get /chat
 *
 * 주어진 필터 및 정렬 조건에 따라 채팅방 목록의 조회 키를 생성합니다.
 * 캐싱을 위한 키로 사용될 수 있습니다.
 *
 * @param {Record<string, unknown> & { where__type?: string }} params - 필터 및 정렬 조건을 포함한 객체
 */
export const readChatsKey = (
	params: Record<string, unknown> & { where__type?: string },
) => [
	"chat",
	"list",
	params.page,
	params.take,
	params.direction,
	params.orderby,
	params.where__type,
];

/**
 * 채팅방 목록 조회 API - get /chat
 *
 * 주어진 필터 및 정렬 조건에 따라 채팅방 목록을 조회하는 API 요청을 만듭니다.
 *
 * @param {Record<string, unknown> & { where__type?: string }} params - 필터 및 정렬 조건을 포함한 객체
 */
export const readChatsApi = (
	params: Record<string, unknown> & { where__type?: string },
) => req<Page<ReadChatDto>>("chat", "get", params);

/**
 * 채팅방 단일 조회 키 생성 - get /chat/:id
 *
 * 주어진 ID에 해당하는 채팅방의 조회 키를 생성합니다.
 * 캐싱을 위한 키로 사용될 수 있습니다.
 *
 * @param {number} id - 조회할 채팅방의 고유 ID
 */
export const readChatKey = (id: number) => ["chat", "single", id];

/**
 * 채팅방 단일 조회 API - get /chat/:id
 *
 * 주어진 ID에 해당하는 채팅방을 조회하는 API 요청을 만듭니다.
 *
 * @param {number} id - 조회할 채팅방의 고유 ID
 */
export const readChatApi = (id: number) =>
	req<ReadChatDto>(`chat/${id}`, "get");

/**
 * 메세지 전송 API - Post /chat/bot/send
 *
 * 메세지를 전송하는 API를 요청합니다.
 *
 * @param {object} body - 채팅방id, 챗id, 메세지
 */
export const sendChatApi = (body: object) =>
	req<SendResultDto>("chat/bot/send", "post", body);
