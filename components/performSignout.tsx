import { signOut } from "@/auth";

export async function performSignout() {
  await signOut();
}
