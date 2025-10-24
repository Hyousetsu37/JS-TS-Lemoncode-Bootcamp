import {
  createEmptyCredentialsFormErrors,
  type CredentialsFormErrors,
} from "./login.vm";

export interface ValidationResult {
  succeeded: boolean;
  error: CredentialsFormErrors;
}

export const validateForm = (
  credentials: CredentialsFormErrors
): ValidationResult => {
  const validationResult: ValidationResult = {
    succeeded: true,
    error: createEmptyCredentialsFormErrors(),
  };

  if (!credentials.user.trim()) {
    validationResult.error = {
      ...validationResult.error,
      user: "Debe llenar el campo usuario",
    };
    validationResult.succeeded = false;
  }

  if (!credentials.password.trim()) {
    validationResult.error = {
      ...validationResult.error,
      password: "Debe llenar el campo password",
    };
    validationResult.succeeded = false;
  }

  return validationResult;
};
