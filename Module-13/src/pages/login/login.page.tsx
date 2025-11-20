import { useNavigate } from "react-router-dom";
import { isValidLogin } from "./api/login.api";
import { LoginFormComponent } from "./components/login-form.component";
import type { Credentials } from "./login.vm";
import { mapCredentialsFromVmToAPI } from "./login.mapper";
import { appRoutes } from "@/core/router";
import styles from "./login.page.module.css";

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const handleSubmit = async (credentials: Credentials) => {
    const apiCredentials = mapCredentialsFromVmToAPI(credentials);
    const response: boolean = await isValidLogin(apiCredentials);
    if (response) {
      navigate(appRoutes.accountList);
    } else {
      alert("usuario o clave no correctas");
    }
  };
  return (
    <>
      <header className={styles.header}>
        <img
          className={styles.logo}
          src="assets/logo_header.svg"
          alt="Bank logo"
        />
      </header>
      <div className={styles["bg-img"]}></div>
      <div>
        <LoginFormComponent onLogin={handleSubmit} />
      </div>
    </>
  );
};
