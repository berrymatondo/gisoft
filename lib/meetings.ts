"use server";
import { prisma } from "@/lib/prisma";
import { meetingFormSchema } from "@/lib/schema";
import { revalidatePath } from "next/cache";
import { z } from "zod";

type Inputs = z.infer<typeof meetingFormSchema>;

// GET ALL GI

/* export const getGis = async () => {
  // console.log("YEsssss, tous les giss");

  try {
    const gis = await prisma.gi.findMany({
      include: {
        secteur: true,
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

// GET A SPECIFIC GI
export const getGi = async (id: string) => {
  try {
    const gi = await prisma.gi.findUnique({
      where: {
        id: +id,
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


  try {
    if (resut.success && data.id) {
      const updateUser = await prisma.gi.update({
        where: {
          id: +data.id,
        },
        data: {
          name: data.name,
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
}; */

// GET ALL MEETINGS
export const getMeetings = async () => {
  try {
    const meetings = await prisma.meeting.findMany({});
    return meetings;
  } catch (error) {
    return { error };
  }
};

// GET MEETINGS OF A GI
export const getGiMeetings = async (giId: string) => {
  try {
    const meetings = await prisma.meeting.findMany({
      where: {
        giId: +giId,
      },
    });
    return meetings;
  } catch (error) {
    return { error };
  }
};

// GET A SPECIFIC RAPPORT
export const getMeeting = async (id: string) => {
  try {
    const meeting = await prisma.meeting.findUnique({
      where: {
        id: +id,
      },
    });
    return meeting;
  } catch (error) {
    return { error };
  }
};

//DELETE RAPPORT
export const deleteMeeting = async (id: number) => {
  // const resut = giFormSchema.safeParse(data);

  try {
    if (id) {
      const meeting = await prisma.meeting.delete({
        where: {
          id: id,
        },
      });

      revalidatePath("/meetings");

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
