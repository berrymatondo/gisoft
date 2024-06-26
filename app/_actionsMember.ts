"use server";
import { prisma } from "@/lib/prisma";
import { personFormSchema } from "@/lib/schema";
import { revalidatePath } from "next/cache";
import { z } from "zod";

type Inputs = z.infer<typeof personFormSchema>;

export const addPerson = async (data: Inputs) => {
  const resut = personFormSchema.safeParse(data);

  let dat: any;
  if (!data.giId) dat = null;
  else dat = data.giId;

  //console.log("data:", data);

  if (resut.success) {
    const user = await prisma.person.create({
      data: {
        firstname: data.firstname ? data.firstname : " ",
        lastname: data.lastname ? data.lastname : " ",
        city: data.city ? data.city : " ",
        mobile: data.mobile ? data.mobile : " ",
        email: data.email ? data.email : " ",
        isIcc: data.isIcc,
        isStar: data.isStar,
        isPilote: data.isPilote,
        giId: dat == "0" ? null : +dat,
        /* isPilote: data.isPilote,
         */
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

  //console.log("UPDATE:", data);

  try {
    if (resut.success && data.id) {
      let dat: any;
      if (!data.giId) dat = null;
      else dat = data.giId;

      //console.log("dat:", dat);

      const updatePerson = await prisma.person.update({
        where: {
          id: +data.id,
        },
        data: {
          firstname: data.firstname ? data.firstname : " ",
          lastname: data.lastname ? data.lastname : " ",
          mobile: data.mobile ? data.mobile : " ",
          email: data.email ? data.email : " ",
          city: data.city ? data.city : " ",
          isIcc: data.isIcc ? data.isIcc : false,
          isStar: data.isStar ? data.isStar : false,
          isPilote: data.isPilote ? data.isPilote : false,
          giId: dat == "0" ? null : +dat,
          /*           lastname: data.lastname ? data.lastname : " ",
          email: data.email ? data.email : " ",
          mobile: data.mobile ? data.mobile : " ",
          isPilote: data.isPilote,
          giId: data.giId, */
        },
      });

      revalidatePath("/members");

      return {
        success: true,
        data: updatePerson,
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
};

export const deletePerson = async (id: number) => {
  //const resut = personFormSchema.safeParse(data);

  //  console.log("UPDATE:", data);

  try {
    //  if (resut.success && data.id) {
    const updateUser = await prisma.person.delete({
      where: {
        id: id,
      },
    });

    revalidatePath("/members");

    return {
      success: true,
      // data: updateUser,
    };
    // }
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
};

// GET A SPECIFIC PERSON
export const getPerson = async (id: string) => {
  try {
    const person = await prisma.person.findUnique({
      where: {
        id: +id,
      },
    });
    return person;
  } catch (error) {
    return { error };
  }
};
