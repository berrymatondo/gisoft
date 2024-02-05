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

export const updateSecteur = async (data: Inputs) => {
  const resut = secteurFormSchema.safeParse(data);

  // console.log("UPDATE:", data);

  try {
    if (resut.success && data.id) {
      const updateUser = await prisma.secteur.update({
        where: {
          id: +data.id,
        },
        data: {
          name: data.name,
        },
      });

      revalidatePath("/gis");

      return {
        success: true,
        data: updateUser,
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
};

export const deleteSecteur = async (data: Inputs) => {
  const resut = secteurFormSchema.safeParse(data);

  //  console.log("UPDATE:", data);

  try {
    if (resut.success && data.id) {
      const updateUser = await prisma.secteur.delete({
        where: {
          id: +data.id,
        },
      });

      revalidatePath("/gis");

      return {
        success: true,
        // data: updateUser,
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
};
