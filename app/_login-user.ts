"use server";

import * as z from "zod";
import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas";
import { DEFAULT_LOGIN_REDIRECT_URL } from "@/routes";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/lib/user";

export const login = async (data: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      error: "Une erreur est survenue lors de la validation des champs",
    };
  }
  // return {
  //   success: "Connexion réussie",
  // };
  const { email, password } = validatedFields.data;

  const user_exists = await getUserByEmail(email);

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT_URL,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Email ou mot de passe invalide !" };
        default:
          return { error: "Quelque s'est mal passé" };
      }
    }

    throw error;
  }
};
