import z from "zod";

export const TopicSchema = z.object({
	id: z.string().optional(),
	name: z.string().min(2, "이름은 2자 이상이어야 합니다."),
});
