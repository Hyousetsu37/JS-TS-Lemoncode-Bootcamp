import { describe, expect, it } from "vitest";
import {
  validateAccountNameField,
  validateAccountTypeField,
} from "./account-field.validations";
import { REQUIRED_FIELD_MESSAGE } from "@/common/validations/validation.const";

describe("account-field.validations.ts", () => {
  describe("validateAccountTypeField", () => {
    it("should return true when type field is empty", () => {
      //Arrange
      const typeValue = "";
      //Act
      const result = validateAccountTypeField(typeValue);
      //Assert
      expect(result.succeeded).toBeFalsy();
      expect(result.errorMessage).toEqual(REQUIRED_FIELD_MESSAGE);
    });
    it("should return false when type field is not empty", () => {
      //Arrange
      const typeValue = "1";
      //Act
      const result = validateAccountTypeField(typeValue);
      //Assert
      expect(result.succeeded).toBeTruthy();
    });
  });
  describe("validateAccountNameField", () => {
    it("should return false when name field is empty ", () => {
      //Arrange
      const nameValue = "";
      //Act
      const result = validateAccountNameField(nameValue);
      //Assert
      expect(result.succeeded).toBeFalsy();
      expect(result.errorMessage).toEqual(REQUIRED_FIELD_MESSAGE);
    });
    it("should return true when name field is not empty", () => {
      //Arrange
      const nameValue = "Videojuegos";
      //Act
      const result = validateAccountNameField(nameValue);
      //Assert
      expect(result.succeeded).toBeTruthy();
    });
  });
});
