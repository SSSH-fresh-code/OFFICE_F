import type { ReadChatBotDto, ReadChatDto } from "sssh-library";

/**
 * Chat 생성 시 Chatbot 의존성 추가/수정시에 사용
 * @param ReadChatBotDto | undefined chatbot
 * @param ReadChatBotDto[] selectChatbots
 * @return ReadChatBotDto[]
 */
export const onAddChatbot = (
	chatbot: ReadChatBotDto | undefined,
	selectChatbots: ReadChatBotDto[],
) => {
	if (chatbot) {
		if (selectChatbots.some((c) => c.id === chatbot.id)) {
			alert("중복된 챗봇입니다! 다른 챗봇을 추가해주세요.");
		} else if (confirm(`'${chatbot.name}' 챗봇을 추가하시겠습니까?`)) {
			return [...selectChatbots, chatbot];
		}
	}
};
