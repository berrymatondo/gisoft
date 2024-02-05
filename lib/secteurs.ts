"use server";
import { prisma } from "@/lib/prisma";
import { secteurFormSchema } from "@/lib/schema";
import { revalidatePath } from "next/cache";
import { z } from "zod";

type Inputs = z.infer<typeof secteurFormSchema>;

// GET ALL SECTEURS

export const getSecteurs = async () => {
  try {
    const secteurs = await prisma.secteur.findMany();

    return secteurs;
  } catch (error) {
    return { error };
  }
};
