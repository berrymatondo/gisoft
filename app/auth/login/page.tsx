import Image from "next/image";
import ImageFond from "../../../public/loginfont.png";
import { LoginForm } from "@/components/auth/login-form";

const styles = {
  container: {
    position: "relative",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    filter: "blur(5px)",
    zIndex: -1,
  },
  formContainer: {
    zIndex: 1, 
  },
};

const LoginUser = () => {
  return (
    <div style={styles.container as React.CSSProperties}>
      <Image
        src={ImageFond}
        alt="Image de fond"
        style={styles.backgroundImage as React.CSSProperties}
      />
      <LoginForm  />
    </div>
  );
};

export default LoginUser;