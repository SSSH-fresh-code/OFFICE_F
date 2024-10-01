import z from "zod";

export const PostSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  content: z.string(),
  thumbnail: z.string().optional(),
  authorName: z.string().min(2, "이름은 2자 이상이어야 합니다."),
  topicId: z.string().min(1, "주제를 선택해주세요"),
  seriesId: z.string().optional()
});
