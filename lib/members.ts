"use server";
import { prisma } from "@/lib/prisma";
import { secteurFormSchema } from "@/lib/schema";
import { revalidatePath } from "next/cache";
import { z } from "zod";

type Inputs = z.infer<typeof secteurFormSchema>;

// GET ALL members

export const getMembers = async () => {
  try {
    const members = await prisma.person.findMany();

    return members;
  } catch (error) {
    return { error };
  }
};

// GET members OF A GI
export const getGiMembers = async (giId: string) => {
  try {
    const members = await prisma.person.findMany({
      where: {
        giId: +giId,
      },
    });
    return members;
  } catch (error) {
    return { error };
  }
};
