import {
  buildRequiredFieldValidationFailedResponse,
  buildValidationFailedResponse,
  buildValidationSuccededResponse,
  isDateAfterToday,
  isPositiveNumber,
  isStringValueInformed,
  isValidEmail,
  isValidIban,
  isValueNotNullOrUndefined,
} from "@/common/validations";

import {
  INVALID_IBAN_MESSAGE,
  INVALID_AMOUNT_MESSAGE,
  INVALID_DATE_TRANSFER_MESSAGE,
  INVALID_EMAIL_MESSAGE,
} from "@/common/validations/validation.const";
import type { FieldValidationResult } from "@/common/validations/validation.model";

export const validateIBANField = (value: string): FieldValidationResult => {
  if (!isStringValueInformed(value)) {
    return buildRequiredFieldValidationFailedResponse();
  }

  if (!isValidIban(value)) {
    return buildValidationFailedResponse(INVALID_IBAN_MESSAGE);
  }

  return buildValidationSuccededResponse();
};

export const validateAccountIdField = (
  value: string,
): FieldValidationResult => {
  if (!isStringValueInformed(value)) {
    return buildRequiredFieldValidationFailedResponse();
  }

  return buildValidationSuccededResponse();
};

export const validateNameField = (value: string): FieldValidationResult => {
  if (!isStringValueInformed(value)) {
    return buildRequiredFieldValidationFailedResponse();
  }

  return buildValidationSuccededResponse();
};

export const validateConceptField = (value: string): FieldValidationResult => {
  if (!isStringValueInformed(value)) {
    return buildRequiredFieldValidationFailedResponse();
  }

  return buildValidationSuccededResponse();
};

export const validateAmountField = (value: number): FieldValidationResult => {
  if (!isPositiveNumber(value)) {
    return buildValidationFailedResponse(INVALID_AMOUNT_MESSAGE);
  }
  return buildValidationSuccededResponse();
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const validateNotesField = (_value: string): FieldValidationResult =>
  buildValidationSuccededResponse();

export const validateRealDateTransferField = (
  value?: Date,
): FieldValidationResult => {
  if (!isValueNotNullOrUndefined(value)) {
    return buildValidationSuccededResponse();
  }
  if (value && !isDateAfterToday(value)) {
    return buildValidationFailedResponse(INVALID_DATE_TRANSFER_MESSAGE);
  }
  return buildValidationSuccededResponse();
};

export const validateEmailField = (value: string): FieldValidationResult => {
  if (!isStringValueInformed(value)) {
    return buildValidationSuccededResponse();
  }
  if (!isValidEmail(value)) {
    return buildValidationFailedResponse(INVALID_EMAIL_MESSAGE);
  }
  return buildValidationSuccededResponse();
};
