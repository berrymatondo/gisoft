"use server";
import { secteurFormSchema } from "@/lib/schema";
import { z } from "zod";

type Inputs = z.infer<typeof secteurFormSchema>;

export const addSecteur = async (data: Inputs) => {
  const resut = secteurFormSchema.safeParse(data);

  if (resut.success) {
    return {
      success: true,
      data: resut.data,
    };
  }

  if (resut.error) {
    return {
      success: false,
      error: resut.error.format(),
    };
  }
};
