import { MessengerType } from "sssh-library";
import z from "zod";

const keys = Object.keys(MessengerType) as [keyof typeof MessengerType];

export const ChatSchema = z.object({
	id: z.number().optional(),
	chatId: z.string(),
	name: z.string().min(2, "이름은 2자 이상이어야 합니다."),
	type: z.enum(keys),
});
