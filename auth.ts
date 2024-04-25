import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Role } from "@prisma/client";

import { prisma } from "./lib/prisma";
import { getUserById } from "./lib/user";
import authConfig from "./auth.config";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") {
        const user_exists = await getUserById(user.id ? user.id : "0");

        // Tannt que le mail n'est pas vérifié, l'utilisateur ne peut pas se connecter.
        if (!user_exists?.emailVerified) {
          return false;
        }

        return true;
      }

      return true;
    },
    async session({ session, token }) {
      console.log("sessionToken", token);
      if (token.sub && session.user) {
        session.user.id = token.sub;
        session.user.name = token.name;
      }

      if (token.role && session.user) {
        session.user.role = token.role as Role;
      }

      if (token.giId && session.user) {
        const gi = await prisma.gi.findUnique({
          where: {
            id: +token.giId,
          },
        });

        console.log("Informations du GI : ", gi);

        if (gi) {
          session.user.giId = gi;
        }

        console.log("Session User : ", session.user);
      }
      return session;
    },

    async jwt({ token }) {
      if (!token.sub) return token;

      const user = await getUserById(token.sub);

      if (!user) return token;

      token.role = user.role;
      token.giId = user.giId;

      return token;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  ...authConfig,
});
