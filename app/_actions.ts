"use server";

import { addGi, getGis } from "@/lib/gis";
import { secteurFormSchema } from "@/lib/schema";
import { getSecteurs } from "@/lib/secteurs";
import { z } from "zod";

type Inputs = z.infer<typeof secteurFormSchema>;

// SECTEURS

export const getSecteursAction = async () => {
  return await getSecteurs();
};

// GROUPES
export const addGiAction = async (data: Inputs) => {
  // console.log("new gi:", data);

  return await addGi(data);
};

export const getGisAction = async () => {
  return await getGis();
};
