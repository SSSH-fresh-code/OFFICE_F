import z from "zod";

export const ChatSendSchema = z.object({
	botId: z.string(),
	chatId: z.string(),
	userId: z.string(),
	message: z.string(),
});
