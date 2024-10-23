import { MessengerType } from "sssh-library";
import z from "zod";

const keys = Object.keys(MessengerType) as [keyof typeof MessengerType];

export const ChatbotSchema = z.object({
	id: z.number().optional(),
	botId: z.string(),
	token: z.string(),
	name: z.string().min(2, "이름은 2자 이상이어야 합니다."),
	description: z.string(),
	type: z.enum(keys),
	chatIds: z.array(z.number()).optional(),
});
