import * as z from "zod";

export const secteurFormSchema = z.object({
  name: z.string().min(3, "minir"),
  referent: z.string().optional(),
});
