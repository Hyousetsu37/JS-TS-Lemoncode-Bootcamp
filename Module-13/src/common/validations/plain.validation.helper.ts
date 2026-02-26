import { REQUIRED_FIELD_MESSAGE } from "./validation.const";
import type { FieldValidationResult } from "./validation.model";

export const buildValidationFailedResponse = (
  errorMessage: string,
): FieldValidationResult => ({ succeeded: false, errorMessage });

export const buildValidationSuccededResponse = (): FieldValidationResult => ({
  succeeded: true,
});

export const buildRequiredFieldValidationFailedResponse = () =>
  buildValidationFailedResponse(REQUIRED_FIELD_MESSAGE);
