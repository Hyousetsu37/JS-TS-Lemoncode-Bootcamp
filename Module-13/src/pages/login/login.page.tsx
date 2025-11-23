import { useNavigate } from "react-router-dom";
import { isValidLogin } from "./api/login.api";
import { LoginFormComponent } from "./components/login-form.component";
import type { Credentials } from "./login.vm";
import { mapCredentialsFromVmToAPI } from "./login.mapper";
import { appRoutes } from "@/core/router";
import styles from "./login.page.module.css";
import { useProfileContext } from "@/core/profile";

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { setUserProfile } = useProfileContext();
  const handleSubmit = async (credentials: Credentials) => {
    const apiCredentials = mapCredentialsFromVmToAPI(credentials);
    const isValid: boolean = await isValidLogin(apiCredentials);
    if (isValid) {
      setUserProfile(credentials.user);
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
      <div className={styles.bg}></div>
      <div className={styles.box}>
        <h1>Acceso</h1>
        <LoginFormComponent onLogin={handleSubmit} />
        <h4 className={styles.inputFooter}>
          Usted se encuentra en un <strong>sitio seguro</strong>
        </h4>
      </div>
    </>
  );
};
