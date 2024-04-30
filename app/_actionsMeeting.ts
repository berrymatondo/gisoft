"use server";
import { prisma } from "@/lib/prisma";
import { meetingFormSchema } from "@/lib/schema";
import { revalidatePath } from "next/cache";
import { z } from "zod";

type Inputs = z.infer<typeof meetingFormSchema>;

export const addMeeting = async (data: Inputs) => {
  console.log("addMeeting ", data);

  const resut = meetingFormSchema.safeParse(data);

  //console.log("RESUT", resut);

  if (resut.success) {
    // Check if a record already exist for the GI on this date

    const foundMeet = await prisma.meeting.findMany({
      where: {
        date: new Date(data.date),
        giId: data.giId ? +data.giId : null,
      },
    });

    console.log("foundMeet:", foundMeet);

    if (foundMeet.length > 0)
      return {
        success: false,
        error: "Cet enregistrement existe déjà",
      };

    const user = await prisma.meeting.create({
      data: {
        date: new Date(data.date),
        nPar: +data.nPar,
        nCon: +data.nCon,
        nIcc: +data.nIcc,
        nNIcc: +data.nPar - +data.nIcc,
        nNew: +data.nNew,
        nStar: +data.nStar,
        giId: data.giId ? +data.giId : null,
        onLine: !data.onLine,
        notes: data.notes,
        /* isPilote: data.isPilote,
        giId: data.giId, */
      },
    });

    revalidatePath("/meetings");

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

export const updateMeeting = async (data: Inputs) => {
  const resut: any = meetingFormSchema.safeParse(data);

  console.log("UPDATE:", data);

  if (resut.success && data.id) {
    const updateMeeting = await prisma.meeting.update({
      where: {
        id: +data.id,
      },
      data: {
        date: new Date(data.date),
        nPar: +data.nPar,
        nCon: +data.nCon,
        nIcc: +data.nIcc,
        nNIcc: +data.nPar - +data.nIcc,
        nNew: +data.nNew,
        nStar: +data.nStar,
        giId: data.giId ? +data.giId : null,
        onLine: !data.onLine,
        notes: data.notes,
        /* isPilote: data.isPilote,
        giId: data.giId, */
      },
    });

    revalidatePath("/meetings");

    return {
      success: true,
      data: updateMeeting,
    };
  }

  if (resut.error) {
    return {
      success: false,
      error: resut.error.format(),
    };
  }
};

export const deleteMeeting = async (data: Inputs) => {
  const resut = meetingFormSchema.safeParse(data);

  //  console.log("UPDATE:", data);

  try {
    if (resut.success && data.id) {
      const deleteMeeting = await prisma.meeting.delete({
        where: {
          id: +data.id,
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
