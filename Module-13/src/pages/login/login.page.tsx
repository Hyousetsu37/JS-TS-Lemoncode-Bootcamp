import { useNavigate } from "react-router-dom";
import { isValidLogin } from "./api/login.api";
import { LoginFormComponent } from "./components/login-form.component";
import type { Credentials } from "./login.vm";
import { mapCredentialsFromVmToAPI } from "./login.mapper";
import { appRoutes } from "@/core/router";

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
    <div>
      <h1>Acceso</h1>
      <LoginFormComponent onLogin={handleSubmit} />
    </div>
  );
};
