import z from "zod";

export const ChatSendSchema = z.object({
	botId: z.string(),
	chatId: z.string(),
	userId: z.string(),
	message: z.string().min(1, "메세지를 작성해주세요"),
});
