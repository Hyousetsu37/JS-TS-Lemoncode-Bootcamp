import {
  buildRequiredFieldValidationFailedResponse,
  buildValidationSuccededResponse,
  isStringValueInformed,
} from "@/common/validations";
import type { FieldValidationResult } from "@/common/validations/validation.model";

export const validateUserField = (value: string): FieldValidationResult => {
  if (!isStringValueInformed(value)) {
    return buildRequiredFieldValidationFailedResponse();
  }
  return buildValidationSuccededResponse();
};

export const validatePasswordField = (value: string): FieldValidationResult => {
  if (!isStringValueInformed(value)) {
    return buildRequiredFieldValidationFailedResponse();
  }
  return buildValidationSuccededResponse();
};
