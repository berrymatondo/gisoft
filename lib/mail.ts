import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirmation de votre compte",
    html: `Bonjour, <br> Veuillez cliquer sur le lien ci-dessous pour confirmer votre compte <br> <a href="${confirmLink}">Confirmer mon compte</a>`,
  });
};
