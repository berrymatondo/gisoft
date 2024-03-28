import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import { LoginSchema } from "./schemas";
import { getUserByEmail } from "./lib/user";

import type { NextAuthConfig } from "next-auth";

export default {
  providers: [
    Credentials({
      async authorize(credentials): Promise<any> {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);

          if (user !== null && "password" in user && user.password !== null) {
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch) {
              return user;
            }
          }
        }

        return null;
      },
    }),
  ],
} as NextAuthConfig;
