import { Button } from "./ui/button";
import { performSignout } from "./../components/performSignout";

const SignOuButton = async () => {
  const handleSignout = async () => {
    await performSignout();
  };

  return (
    <Button
      className="p-1 bg-red-600 text-white font-normal"
      onClick={handleSignout}
    >
      Déconnexion
    </Button>
  );
};

export default SignOuButton;
