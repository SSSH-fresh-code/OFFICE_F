import z from "zod";

export const PermissionSchema = z.object({
  name: z.string().length(8, "권한명은 8자여야 합니다."),
  description: z.string().optional()
});
