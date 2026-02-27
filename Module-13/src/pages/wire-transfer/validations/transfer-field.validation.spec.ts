import { describe, expect, it } from "vitest";
import {
  validateIBANField,
  validateAccountIdField,
  validateNameField,
  validateAmountField,
  validateConceptField,
  validateRealDateTransferField,
  validateEmailField,
} from "./transfer-field.validation";
import {
  REQUIRED_FIELD_MESSAGE,
  INVALID_IBAN_MESSAGE,
  INVALID_AMOUNT_MESSAGE,
  INVALID_DATE_TRANSFER_MESSAGE,
  INVALID_EMAIL_MESSAGE,
} from "@/common/validations/validation.const";

describe("transfer-field.validation specs", () => {
  describe("validateIBANField", () => {
    it("should return false when iban is empty", () => {
      //Arrange
      //const vaule = "ES91 2100 0418 4502 0003 1333";
      const emptyValue = "";
      //Act
      const result = validateIBANField(emptyValue);
      //Assert
      expect(result.succeeded).toBeFalsy();
      expect(result.errorMessage).toEqual(REQUIRED_FIELD_MESSAGE);
    });

    it("should return false when iban is wrong", () => {
      //Arrange
      const value = "ES91 2100 0418 4502 0003 1333";
      //const emptyValue = "";
      //Act
      const result = validateIBANField(value);
      //Assert
      expect(result.succeeded).toBeFalsy();
      expect(result.errorMessage).toEqual(INVALID_IBAN_MESSAGE);
    });

    it("should return true when iban is correct", () => {
      //Arrange
      const value = "ES91 2100 0418 4502 0005 1332";
      //const emptyValue = "";
      //Act
      const result = validateIBANField(value);
      //Assert
      expect(result.succeeded).toBeTruthy();
    });
  });

  describe("validateAccountField", () => {
    it("should return false when account Field is empty", () => {
      //Arrange
      //const vaule = "ES91 2100 0418 4502 0003 1333";
      const emptyValue = "";
      //Act
      const result = validateAccountIdField(emptyValue);
      //Assert
      expect(result.succeeded).toBeFalsy();
      expect(result.errorMessage).toEqual(REQUIRED_FIELD_MESSAGE);
    });

    it("should return true when Account Field is not empty", () => {
      //Arrange
      const value = "2";
      //const emptyValue = "";
      //Act
      const result = validateAccountIdField(value);
      //Assert
      expect(result.succeeded).toBeTruthy();
    });
  });

  describe("validateNameField", () => {
    it("should return false when Name Field is empty", () => {
      //Arrange
      //const vaule = "ES91 2100 0418 4502 0003 1333";
      const emptyValue = "";
      //Act
      const result = validateNameField(emptyValue);
      //Assert
      expect(result.succeeded).toBeFalsy();
      expect(result.errorMessage).toEqual(REQUIRED_FIELD_MESSAGE);
    });

    it("should return false when Name Field is not empty", () => {
      //Arrange
      const value = "2";
      //const emptyValue = "";
      //Act
      const result = validateNameField(value);
      //Assert
      expect(result.succeeded).toBeTruthy();
    });
  });

  describe("validateConceptField", () => {
    it("should return false when Concept Field is empty", () => {
      //Arrange
      //const vaule = "ES91 2100 0418 4502 0003 1333";
      const emptyValue = "";
      //Act
      const result = validateConceptField(emptyValue);
      //Assert
      expect(result.succeeded).toBeFalsy();
      expect(result.errorMessage).toEqual(REQUIRED_FIELD_MESSAGE);
    });

    it("should return false when Concept Field is not empty", () => {
      //Arrange
      const value = "2";
      //const emptyValue = "";
      //Act
      const result = validateConceptField(value);
      //Assert
      expect(result.succeeded).toBeTruthy();
    });
  });

  describe("validateAmountField", () => {
    it("should return false when amount Field is less than 0", () => {
      //Arrange
      const value = -1;
      //Act
      const result = validateAmountField(value);
      //Assert
      expect(result.succeeded).toBeFalsy();
      expect(result.errorMessage).toEqual(INVALID_AMOUNT_MESSAGE);
    });

    it("should return false when amount Field more than 0", () => {
      //Arrange
      const value = 3;
      //const emptyValue = "";
      //Act
      const result = validateAmountField(value);
      //Assert
      expect(result.succeeded).toBeTruthy();
    });
  });

  describe("validateRealDateTransferField", () => {
    it("should return true when date is not informed", () => {
      //Arrange
      const value = undefined;
      //Act
      const result = validateRealDateTransferField(value);
      //Assert
      expect(result.succeeded).toBeTruthy();
    });

    it("should return false when date is before today", () => {
      //Arrange
      const value = new Date();
      value.setDate(value.getDate() - 1);
      //const emptyValue = "";
      //Act
      const result = validateRealDateTransferField(value);
      //Assert
      expect(result.succeeded).toBeFalsy();
      expect(result.errorMessage).toEqual(INVALID_DATE_TRANSFER_MESSAGE);
    });
    it("should return true when date is after today", () => {
      //Arrange
      const value = new Date();
      value.setDate(value.getDate() + 1);
      //const emptyValue = "";
      //Act
      const result = validateRealDateTransferField(value);
      //Assert
      expect(result.succeeded).toBeTruthy();
    });
  });

  describe("validateEmailField", () => {
    it("should return true when email is not informed", () => {
      //Arrange
      const value = "";
      //Act
      const result = validateEmailField(value);
      //Assert
      expect(result.succeeded).toBeTruthy();
    });

    it("should return false when email is not well formed", () => {
      //Arrange
      const value = "jhon@gmail";
      //const emptyValue = "";
      //Act
      const result = validateEmailField(value);
      //Assert
      expect(result.succeeded).toBeFalsy();
      expect(result.errorMessage).toEqual(INVALID_EMAIL_MESSAGE);
    });
    it("should return true when email is well formed", () => {
      //Arrange
      const value = "jhon@gmail.com";
      //const emptyValue = "";
      //Act
      const result = validateEmailField(value);
      //Assert
      expect(result.succeeded).toBeTruthy();
    });
  });
});
