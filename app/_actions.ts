"use server";
import { prisma } from "@/lib/prisma";
import { secteurFormSchema } from "@/lib/schema";
import { revalidatePath } from "next/cache";
import { z } from "zod";

type Inputs = z.infer<typeof secteurFormSchema>;

export const addSecteur = async (data: Inputs) => {
  const resut = secteurFormSchema.safeParse(data);

  if (resut.success) {
    const user = await prisma.secteur.create({
      data: {
        name: data.name,
      },
    });

    revalidatePath("/gis");

    return {
      success: true,
      data: user,
    };
  }

  if (resut.error) {
    return {
      success: false,
      error: resut.error.format(),
    };
  }
};
