import { CardWrapper } from "./card-wrapper" 

export const LoginForm = () => {
  return (
    <CardWrapper headerLabel="Connexion" backButtonLabel="As-tu dejà un compte ?" backButtonHref="/auth/register">
      Login Form
    </CardWrapper>
  );
};
