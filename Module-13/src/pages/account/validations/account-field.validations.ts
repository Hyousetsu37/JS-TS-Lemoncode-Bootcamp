import {
  buildRequiredFieldValidationFailedResponse,
  buildValidationSuccededResponse,
  isStringValueInformed,
} from "@/common/validations";
import type { FieldValidationResult } from "@/common/validations/validation.model";

export const validateAccountTypeField = (
  value: string,
): FieldValidationResult => {
  if (!isStringValueInformed(value)) {
    return buildRequiredFieldValidationFailedResponse();
  }

  return buildValidationSuccededResponse();
};

export const validateAccountNameField = (
  value: string,
): FieldValidationResult => {
  if (!isStringValueInformed(value)) {
    return buildRequiredFieldValidationFailedResponse();
  }

  return buildValidationSuccededResponse();
};
