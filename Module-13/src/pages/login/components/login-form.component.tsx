import {
  createEmptyCredentials,
  createEmptyCredentialsFormErrors,
  type CredentialsFormErrors,
  type Credentials,
} from "@/pages/login/login.vm";
import { useState } from "react";
import { validateForm, type ValidationResult } from "../login.validation";

interface Props {
  onLogin: (credentials: Credentials) => void;
}

export const LoginFormComponent: React.FC<Props> = (props) => {
  const { onLogin } = props;
  const [credentials, setCredentials] = useState<Credentials>(
    createEmptyCredentials()
  );
  const [error, setError] = useState<CredentialsFormErrors>(
    createEmptyCredentialsFormErrors()
  );

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const ValidationResult: ValidationResult = validateForm(credentials);
    setError(ValidationResult.error);
    if (ValidationResult.succeeded) {
      onLogin(credentials);
    }
  };
  return (
    <form action="" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Usuario</label>
        <input
          type="text"
          id="username"
          name="user"
          onChange={handleFieldChange}
        />
        {error.user && <p className="error">{error.user}</p>}
      </div>
      <div>
        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={handleFieldChange}
        />
        {error.password && <p className="error">{error.password}</p>}
      </div>
      <button type="submit">Acceder</button>
    </form>
  );
};
