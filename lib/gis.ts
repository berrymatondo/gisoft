"use server";
import { prisma } from "@/lib/prisma";
import { giFormSchema } from "@/lib/schema";
import { GiStatuses } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

type Inputs = z.infer<typeof giFormSchema>;

// GET ALL GI

export const getGis = async () => {
  // console.log("YEsssss, tous les giss");

  try {
    const gis = await prisma.gi.findMany({
      include: {
        secteur: true,
        address: true,
      },
      orderBy: {
        id: "asc",
      },
    });
    // console.log("GIS lenghre: ", gis);

    return gis;
  } catch (error) {
    return { error };
  }
};

// GET ALL GI Pages

export const getGisPages = async ({
  take = 10,
  skip = 0,
}: {
  take?: number;
  skip?: number;
}) => {
  // console.log("YEsssss, tous les giss");

  try {
    const gis = await prisma.gi.findMany({
      take: take,
      skip: skip,
      include: {
        secteur: true,
      },
      orderBy: {
        id: "asc",
      },
    });
    console.log("GIS lenghre: ", gis);

    return gis;
  } catch (error) {
    return { error };
  }
};

// GET A SPECIFIC GI
export const getGi = async (id: string) => {
  try {
    const gi = await prisma.gi.findUnique({
      where: {
        id: +id,
      },
      include: {
        secteur: true,
      },
    });
    return gi;
  } catch (error) {
    return { error };
  }
};

// ADD NEW GI
export const addGi = async (data: Inputs) => {
  const resut = giFormSchema.safeParse(data);
  if (resut.success) {
    try {
      const user = await prisma.gi.create({
        data: {
          name: data.name,
          secteurId: data.secteurId ? +data.secteurId : null,
        },
      });

      revalidatePath("/gis");

      return {
        success: true,
        data: user,
      };
    } catch (error) {}
  } else {
    return {
      success: false,
      error: resut.error.format(),
    };
  }
};

//UPDATE GI
export const updateGi = async (data: Inputs) => {
  const resut = giFormSchema.safeParse(data);

  //console.log("UPDATE DATA: ", data);
  //console.log("UPDATE resut: ", resut);

  try {
    if (resut.success && data.id) {
      const updateUser = await prisma.gi.update({
        where: {
          id: +data.id,
        },
        data: {
          name: data.name,
          statut: data.statut as GiStatuses,
          addressId: data.addressId ? +data.addressId : null,
          secteurId: data.secteurId ? +data.secteurId : null,
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

//DELETE GI
export const deleteGi = async (data: Inputs) => {
  // const resut = giFormSchema.safeParse(data);

  try {
    if (data.id) {
      const updateUser = await prisma.gi.delete({
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
