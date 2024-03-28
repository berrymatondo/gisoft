import NextAuth, { type DefaultSession } from "next-auth";
import { Role } from "@prisma/client";

export type ExtendedUser = DefaultSession["user"] & {
  role: Role;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}

import { JWT } from "@auth/core/jwt";

declare module "@auth/core/jwt" {
  interface JWT {
    role: "ADMIN" | "USER";
  }
}
