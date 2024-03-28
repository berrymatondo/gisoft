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
    async session({ session, token }) {
      console.log("sessionToken", token);
      if (token.sub && session.user) {
        session.user.id = token.sub;
        session.user.name = token.name;
      }

      if (token.role && session.user) {
        session.user.role = token.role as Role;
      }
      return session;
    },

    async jwt({ token }) {
      if (!token.sub) return token;

      const user = await getUserById(token.sub);

      if (!user) return token;

      token.role = user.role;

      // console.log("token :", token);
      return token;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  ...authConfig,
});