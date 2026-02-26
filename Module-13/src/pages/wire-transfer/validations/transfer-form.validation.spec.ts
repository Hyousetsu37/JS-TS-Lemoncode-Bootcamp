import { describe, it, expect, vi } from "vitest";
import type { TransferVm } from "../transfer.vm";
import * as transferFieldValidaion from "./transfer-field.validation";
import { validateForm } from "./transfer-form.validation";

describe("transfer-form.validation specs", () => {
  describe("validateForm", () => {
    it("Should return true when all fields are correct", () => {
      //Arrage
      const transfer: TransferVm = {
        accountId: "1",
        iban: "ES91 2100 0418 4502 0005 1332",
        name: "Jhon Doe",
        amount: 1,
        concept: "Test",
        notes: "",
        dateTransfer: "",
        realDateTransfer: undefined,
        email: "",
      };

      vi.spyOn(transferFieldValidaion, "validateIBANField").mockReturnValue({
        succeeded: true,
      });
      vi.spyOn(
        transferFieldValidaion,
        "validateAccountIdField",
      ).mockReturnValue({
        succeeded: true,
      });
      vi.spyOn(transferFieldValidaion, "validateNameField").mockReturnValue({
        succeeded: true,
      });
      vi.spyOn(transferFieldValidaion, "validateAmountField").mockReturnValue({
        succeeded: true,
      });
      vi.spyOn(transferFieldValidaion, "validateConceptField").mockReturnValue({
        succeeded: true,
      });
      vi.spyOn(transferFieldValidaion, "validateNotesField").mockReturnValue({
        succeeded: true,
      });
      vi.spyOn(
        transferFieldValidaion,
        "validateRealDateTransferField",
      ).mockReturnValue({
        succeeded: true,
      });
      vi.spyOn(transferFieldValidaion, "validateEmailField").mockReturnValue({
        succeeded: true,
      });

      //Act
      const result = validateForm(transfer);
      //Assert
      expect(result.succeeded).toBeTruthy();
      expect(result.errors).toEqual({
        accountId: "",
        iban: "",
        name: "",
        amount: "",
        concept: "",
        notes: "",
        dateTransfer: "",
        realDateTransfer: "",
        email: "",
      });
    });
    it("Should return false when validateNameFieldAmount is incorrect", () => {
      //Arrage
      const transfer: TransferVm = {
        accountId: "1",
        iban: "ES91 2100 0418 4502 0005 1332",
        name: "Jhon Doe",
        amount: 1,
        concept: "Test",
        notes: "",
        dateTransfer: "",
        realDateTransfer: undefined,
        email: "",
      };

      //---------------------SPY ON-----------------------------//
      vi.spyOn(transferFieldValidaion, "validateIBANField").mockReturnValue({
        succeeded: true,
      });
      vi.spyOn(
        transferFieldValidaion,
        "validateAccountIdField",
      ).mockReturnValue({
        succeeded: true,
      });
      vi.spyOn(transferFieldValidaion, "validateNameField").mockReturnValue({
        succeeded: false,
        errorMessage: "Error",
      });
      vi.spyOn(transferFieldValidaion, "validateAmountField").mockReturnValue({
        succeeded: true,
      });
      vi.spyOn(transferFieldValidaion, "validateConceptField").mockReturnValue({
        succeeded: true,
      });
      vi.spyOn(transferFieldValidaion, "validateNotesField").mockReturnValue({
        succeeded: true,
      });
      vi.spyOn(
        transferFieldValidaion,
        "validateRealDateTransferField",
      ).mockReturnValue({
        succeeded: true,
      });
      vi.spyOn(transferFieldValidaion, "validateEmailField").mockReturnValue({
        succeeded: true,
      });

      //Act
      const result = validateForm(transfer);

      //Assert
      expect(result.succeeded).toBeFalsy();
      expect(result.errors).toEqual({
        accountId: "",
        iban: "",
        name: "Error",
        amount: "",
        concept: "",
        notes: "",
        dateTransfer: "",
        realDateTransfer: "",
        email: "",
      });
    });

    //-----------------------------------------------//
    it("Should return true when all fields are correct", () => {
      //Arrage
      // const transfer: TransferVm = {
      //   accountId: "1",
      //   iban: "ES91 2100 0418 4502 0005 1332",
      //   name: "Jhon Doe",
      //   amount: 1,
      //   concept: "Test",
      //   notes: "",
      //   dateTransfer: "",
      //   realDateTransfer: undefined,
      //   email: "",
      // };
      //Act
      //Assert
    });
  });
});
