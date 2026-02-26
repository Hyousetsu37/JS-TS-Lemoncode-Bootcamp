import type { FormValidationResult } from "@/common/validations/validation.model";
import { type CredentialsFormErrors } from "./login.vm";
import {
  validatePasswordField,
  validateUserField,
} from "./components/login-field.validation";

export const validateForm = (
  credentials: CredentialsFormErrors,
): FormValidationResult<CredentialsFormErrors> => {
  const fieldValidationResults = [
    validateUserField(credentials.user),
    validatePasswordField(credentials.password),
  ];

  return {
    succeeded: fieldValidationResults.every((field) => field.succeeded),
    errors: {
      user: fieldValidationResults[0].errorMessage ?? "",
      password: fieldValidationResults[1].errorMessage ?? "",
    },
  };
};
