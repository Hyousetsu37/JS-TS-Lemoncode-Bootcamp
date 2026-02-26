import type { FormValidationResult } from "@/common/validations/validation.model";
import type { TransferError, TransferVm } from "../transfer.vm";
import {
  validateAccountIdField,
  validateAmountField,
  validateConceptField,
  validateEmailField,
  validateIBANField,
  validateNameField,
  validateNotesField,
  validateRealDateTransferField,
} from "./transfer-field.validation";

export const validateForm = (
  transfer: TransferVm,
): FormValidationResult<TransferError> => {
  const fieldValidationResuts = [
    validateAccountIdField(transfer.accountId),
    validateIBANField(transfer.iban),
    validateNameField(transfer.name),
    validateAmountField(transfer.amount),
    validateConceptField(transfer.concept),
    validateNotesField(transfer.notes),
    validateRealDateTransferField(transfer.realDateTransfer),
    validateEmailField(transfer.email),
  ];

  return {
    succeeded: fieldValidationResuts.every((field) => field.succeeded),
    errors: {
      accountId: fieldValidationResuts[0].errorMessage ?? "",
      iban: fieldValidationResuts[1].errorMessage ?? "",
      name: fieldValidationResuts[2].errorMessage ?? "",
      amount: fieldValidationResuts[3].errorMessage ?? "",
      concept: fieldValidationResuts[4].errorMessage ?? "",
      notes: fieldValidationResuts[5].errorMessage ?? "",
      realDateTransfer: fieldValidationResuts[6].errorMessage ?? "",
      email: fieldValidationResuts[7].errorMessage ?? "",
      dateTransfer: "",
    },
  };
};
