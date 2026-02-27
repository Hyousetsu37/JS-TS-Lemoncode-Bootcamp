import type { FormValidationResult } from "@/common/validations/validation.model";
import type { accountCreationError } from "../account.vm";
import type { Account } from "../api/account-api.model";
import {
  validateAccountNameField,
  validateAccountTypeField,
} from "./account-field.validations";

export const validateAccountForm = (
  account: Account,
): FormValidationResult<accountCreationError> => {
  const fieldValidationResults = [
    validateAccountTypeField(account.type),
    validateAccountNameField(account.name),
  ];
  return {
    succeeded: fieldValidationResults.every((field) => field.succeeded),
    errors: {
      type: fieldValidationResults[0].errorMessage ?? "",
      name: fieldValidationResults[1].errorMessage ?? "",
    },
  };
};
