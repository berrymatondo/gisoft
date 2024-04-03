import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Entrer une adresse email valide",
  }),
  password: z.string().min(5, {
    message: "Entrer un mot de passe valide",
  }),
});

export const RegisterSchema = z
  .object({
    name: z.string().min(3, {
      message: "Entrer un nom valide",
    }),
    email: z.string().email({
      message: "Entrer une adresse email valide",
    }),
    password: z.string().min(5, {
      message: "Entrer un mot de passe valide",
    }),
    confirmPassword: z.string().min(5, {
      message: "Confirmer votre mot de passe",
    }),
    isAdmin: z.boolean().optional().default(false),
    giId: z.string().optional(),
    // .refine((giId) => {
    //   if (typeof giId !== "undefined" && isNaN(giId)) {
    //     return "L'ID du GI doit être un nombre";
    //   }
    //   return true;
    // }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });
