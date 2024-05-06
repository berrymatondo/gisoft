import { Resend } from "resend";
import path from "path";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;
  const logo = path.resolve("../public/images/icc.png");

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirmation de votre compte",
    html: `
    <html>
    <body>
    <div>
    <img src="${logo}" alt="logo" width="100px" height="100px"/>
    <h1>Confirmation de votre compte</h1>
    <p>Bonjour,<br/>  Vous avez demandé à créer un compte sur le groupe des GI des églises ICC. Cliquez sur le lien ci-dessous pour confirmer votre compte.</p>
    <p><a href="${confirmLink}">Confirmer mon compte</a></p>
    </div>
    </body>
    </html>
    `,
  });
};
