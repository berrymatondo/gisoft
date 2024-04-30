"use server";

import { addGi, getGis, getGisPages } from "@/lib/gis";
import { secteurFormSchema } from "@/lib/schema";
import { getSecteurs } from "@/lib/secteurs";
import { number, z } from "zod";

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

export const getGisPagesAction = async (take: number, skip: number) => {
  return await getGisPages({
    take,
    skip,
  });
};
