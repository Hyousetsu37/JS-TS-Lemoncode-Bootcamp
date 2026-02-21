import { describe, expect, it } from "vitest";
import {
  isDateAfterToday,
  isPositiveNumber,
  isStringValueInformed,
  isValidEmail,
  isValidIban,
} from "./plain.validation";

describe("plain.validation", () => {
  describe("isValidIban specs", () => {
    it("should return true when iban is valid", () => {
      //Arrange
      const iban = "ES91 2100 0418 4502 0005 1332";
      //Act
      const result = isValidIban(iban);
      //Assert
      expect(result).toBeTruthy();
    });
    it("should return false when iban is empty", () => {
      //Arrange
      const iban = "";
      //Act
      const result = isValidIban(iban);
      //Assert
      expect(result).toBeFalsy();
    });
  });
  describe("isPositiveNumber", () => {
    it("Should return true if the amount is positive", () => {
      //Arrange
      const amount = 10;
      //Act
      const result = isPositiveNumber(amount);
      //Assert
      expect(result).toBeTruthy();
    });
    it("Should return false if the amount is not positive", () => {
      //Arrange
      const amount = -10;
      //Act
      const result = isPositiveNumber(amount);
      //Assert
      expect(result).toBeFalsy();
    });
  });
  describe("isDateAfter", () => {
    it("Should return true if the date is after today", () => {
      //Arrange
      const date = new Date();
      date.setDate(date.getDate() + 1);
      //Act
      const result = isDateAfterToday(date);
      //Assert
      expect(result).toBeTruthy();
    });
    it("Should return false if the date is not after today", () => {
      //Arrange
      const date = new Date();
      date.setDate(date.getDate() - 1);
      //Act
      const result = isDateAfterToday(date);
      //Assert
      expect(result).toBeFalsy();
    });
  });
  describe("isValidEmail", () => {
    it("Should return true if the email is valid", () => {
      //Arrange
      const email = "someemail@gmail.com";
      //Act
      const result = isValidEmail(email);
      //Assert
      expect(result).toBeTruthy();
    });
    it("Should return false if the email is not valid", () => {
      //Arrange
      const email = "someemail@gmail";
      //Act
      const result = isValidEmail(email);
      //Assert
      expect(result).toBeFalsy();
    });
  });
  describe("isStringValueInformed", () => {
    it("Should return true if the string is filled", () => {
      //Arrange
      const field = "someemail@gmail.com";
      //Act
      const result = isStringValueInformed(field);
      //Assert
      expect(result).toBeTruthy();
    });
    it("Should return false if the string is not filled", () => {
      //Arrange
      const email = "";
      //Act
      const result = isStringValueInformed(email);
      //Assert
      expect(result).toBeFalsy();
    });
  });
});
