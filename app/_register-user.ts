"use server";

import * as z from "zod";
import bcrypt from "bcrypt";

import { RegisterSchema } from "@/schemas";
import { prisma } from "../lib/prisma";

export const register = async (data: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      error: "Une erreur est survenue lors de la validation des champs",
    };
  }

  const { email, password, name, isAdmin } = validatedFields.data;
  const passwordHash = await bcrypt.hash(password, 10);

  const user_exists = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (user_exists) {
    return {
      error: "Cet email est déjà utilisé",
    };
  }

  await prisma.user.create({
    data: {
      email,
      name,
      password: passwordHash,
      isPilot: isAdmin,
    },
  });

  return {
    success: "Inscription réussie",
  };
};
