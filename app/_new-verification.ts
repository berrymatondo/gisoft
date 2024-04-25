"use server";

import { prisma } from "@/lib/prisma";
import { getUserByEmail } from "@/lib/user";
import { getVerficationTokenByToken } from "@/data/verification-token";

export const newVerificationToken = async (token: string) => {
  const token_exists = await getVerficationTokenByToken(token);

  if (!token_exists) {
    return {
      error: "Ce token n'existe pas !",
    };
  }

  const tokenExpired = new Date(token_exists.expires) < new Date();

  if (tokenExpired) {
    return {
      error: "Ce token a expiré !",
    };
  }

  const user_exists = await getUserByEmail(token_exists.email);

  if (!user_exists) {
    return {
      error: "Cet email n'existe pas !",
    };
  }

  await prisma.user.update({
    where: {
      id: user_exists.id,
    },
    data: {
      emailVerified: new Date(),
      email: token_exists.email,
    },
  });

  await prisma.verificationToken.delete({
    where: {
      id: token_exists.id,
    },
  });

  return { succes: "Email vérifié avec succès !" };
};
