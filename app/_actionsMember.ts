"use server";
import { prisma } from "@/lib/prisma";
import { personFormSchema } from "@/lib/schema";
import { revalidatePath } from "next/cache";
import { z } from "zod";

type Inputs = z.infer<typeof personFormSchema>;

export const addPerson = async (data: Inputs) => {
  const resut = personFormSchema.safeParse(data);

  if (resut.success) {
    const user = await prisma.person.create({
      data: {
        firstname: data.firstname ? data.firstname : " ",
        lastname: data.lastname ? data.lastname : " ",
        email: data.email ? data.email : " ",
        mobile: data.mobile ? data.mobile : " ",
        /* isPilote: data.isPilote,
        giId: data.giId, */
      },
    });

    revalidatePath("/members");

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

export const updatePerson = async (data: Inputs) => {
  const resut = personFormSchema.safeParse(data);

  // console.log("UPDATE:", data);

  try {
    if (resut.success && data.id) {
      const updateUser = await prisma.person.update({
        where: {
          id: +data.id,
        },
        data: {
          firstname: data.firstname ? data.firstname : " ",
          /*           lastname: data.lastname ? data.lastname : " ",
          email: data.email ? data.email : " ",
          mobile: data.mobile ? data.mobile : " ",
          isPilote: data.isPilote,
          giId: data.giId, */
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

export const deletePerson = async (data: Inputs) => {
  const resut = personFormSchema.safeParse(data);

  //  console.log("UPDATE:", data);

  try {
    if (resut.success && data.id) {
      const updateUser = await prisma.person.delete({
        where: {
          id: +data.id,
        },
      });

      revalidatePath("/members");

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
