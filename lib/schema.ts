import * as z from "zod";

export const secteurFormSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  referent: z.string().optional(),
});

export const giFormSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  piloteId: z.string().optional(),
  secteurId: z.string().optional(),
});
