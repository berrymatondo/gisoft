import * as z from "zod";

export const secteurFormSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  referent: z.string().optional(),
});

export const giFormSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  piloteId: z.string().optional(),
  secteurId: z.string().optional(),
});

export const personFormSchema = z.object({
  id: z.string().optional(),
  firstname: z.string().min(1),
  lastname: z.string().optional(),
  email: z.string().email().optional(),
  mobile: z.string().optional(),
  /*isPilote: z.boolean().optional(),
  giId: z.number().optional(), */
});

export const meetingFormSchema = z
  .object({
    id: z.string().optional(),
    date: z.string(),
    nPar: z.string(),
    nCon: z.string(),
    nIcc: z.string(),
    nNIcc: z.string(),
    nNew: z.string(),
    nStar: z.string(),
    giId: z.string().optional(),
    /*isPilote: z.boolean().optional(),
  giId: z.number().optional(), */
  })
  .refine((obj) => +obj.nIcc <= +obj.nPar, {
    message:
      "Le nombre de membres ICC ne peut pas être plus grand que le nombre des participants",
    path: ["nIcc"],
  })
  .refine((obj) => +obj.nCon <= +obj.nPar, {
    message:
      "Le nombre de connexions ne peut pas être plus grand que le nombre des participants",
    path: ["nCon"],
  })
  .refine((obj) => +obj.nStar <= +obj.nPar, {
    message:
      "Le nombre de star ne peut pas être plus grand que le nombre des participants",
    path: ["nStar"],
  })
  .refine((obj) => +obj.nStar <= +obj.nIcc, {
    message:
      "Le nombre de star ne peut pas être plus grand que le nombre de membres ICC",
    path: ["nStar"],
  })
  .refine((obj) => +obj.nNew <= +obj.nPar, {
    message:
      "Le nombre de nouveaux ne peut pas être plus grand que le nombre de partiipants",
    path: ["nNew"],
  });
