import {
  createEmptyCredentials,
  createEmptyCredentialsFormErrors,
  type CredentialsFormErrors,
  type Credentials,
} from "@/pages/login/login.vm";
import { useState } from "react";
import { validateForm } from "../login.validation";
import styles from "./login-form.component.module.css";
import type { FormValidationResult } from "@/common/validations/validation.model";

interface Props {
  onLogin: (credentials: Credentials) => void;
}

export const LoginFormComponent: React.FC<Props> = (props) => {
  const { onLogin } = props;
  const [credentials, setCredentials] = useState<Credentials>(
    createEmptyCredentials(),
  );
  const [error, setError] = useState<CredentialsFormErrors>(
    createEmptyCredentialsFormErrors(),
  );

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const ValidationResult: FormValidationResult<CredentialsFormErrors> =
      validateForm(credentials);
    setError(ValidationResult.errors);
    if (ValidationResult.succeeded) {
      onLogin(credentials);
    }
  };
  return (
    <form action="" className={styles.form} onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          id="username"
          name="user"
          onChange={handleFieldChange}
          placeholder="Usuario"
          className={error.user ? styles.inputError : ""}
        />
        {error.user && <p className={styles.error}>{error.user}</p>}
      </div>
      <div>
        <input
          type="password"
          id="password"
          name="password"
          onChange={handleFieldChange}
          placeholder="Contraseña"
          className={error.password ? styles.inputError : ""}
        />
        {error.password && <p className={styles.error}>{error.password}</p>}
      </div>
      <button type="submit" className={styles.btnSend}>
        Acceder
      </button>
    </form>
  );
};
