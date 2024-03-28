"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { RegisterSchema } from "@/schemas";
import { prisma } from "../lib/prisma";
import { getUserByEmail } from "@/lib/user";

export const register = async (data: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      error: "Une erreur est survenue lors de la validation des champs",
    };
  }

  const { email, password, name, isAdmin } = validatedFields.data;
  const passwordHash = await bcrypt.hash(password, 10);

  // Ce qui serait mieux est de définir une méthode reutilisable 
  

  // const user_exists = await prisma.user.findUnique({
  //   where: {
  //     email,
  //   },
  // });
  const user_exists = await getUserByEmail(email);

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
