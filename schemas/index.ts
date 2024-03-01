import * as z from "zod";

export const LoginSchema = z.object({
  username: z
    .string()
    .min(3)
    .max(20, {
      message: "Veuillez entrer un nom d'utilisateur valide",
    })
    .nonempty(),
  password: z
    .string()
    .min(8)
    .max(20, {
      message: "Veuillez entrer un mot de passe valide",
    })
    .nonempty(),
});
