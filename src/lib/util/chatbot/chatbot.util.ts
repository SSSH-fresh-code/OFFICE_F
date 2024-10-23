import type { ReadChatDto } from "sssh-library";

/**
 * Chatbot 생성 시 Chat 의존성 추가/수정시에 사용
 * @param ReadChatDto | undefined chat
 * @param ReadChatDto[] selectChats
 * @return ReadChatDto[]
 */
export const onAddChat = (
	chat: ReadChatDto | undefined,
	selectChats: ReadChatDto[],
) => {
	if (chat) {
		if (selectChats.some((c) => c.id === chat.id)) {
			alert("중복된 채팅방입니다! 다른 채팅방을 추가해주세요.");
		} else if (confirm(`'${chat.name}' 채팅방을 추가하시겠습니까?`)) {
			return [...selectChats, chat];
		}
	}
};
