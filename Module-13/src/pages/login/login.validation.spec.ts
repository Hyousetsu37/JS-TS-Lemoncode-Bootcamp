import type { Credentials } from "./login.vm";
import { describe, expect, it } from "vitest";
import { validateForm, type ValidationResult } from "./login.validation";

describe("login.validation specs", () => {
  it("Should return a validation succeded = true when both fields have been filled", () => {
    //Arrange
    const testCredentials: Credentials = {
      user: "testUser",
      password: "testPassword",
    };
    //Act
    const result: ValidationResult = validateForm(testCredentials);
    //Assert
    expect(result.succeeded).toBeTruthy();
    expect(result.error.user).toEqual("");
    expect(result.error.password).toEqual("");
  });
  it("Should return a validation succeded = false whenthe username has not been filled", () => {
    //Arrange
    const testCredentials: Credentials = {
      user: "",
      password: "testPassword",
    };
    //Act
    const result: ValidationResult = validateForm(testCredentials);
    //Assert
    expect(result.succeeded).toBeFalsy();
    expect(result.error.user).toEqual("Debe llenar el campo usuario");
    expect(result.error.password).toEqual("");
  });
  it("Should return a validation succeded = false when the password has not been filled", () => {
    //Arrange
    const testCredentials: Credentials = {
      user: "testUser",
      password: "",
    };
    //Act
    const result: ValidationResult = validateForm(testCredentials);
    //Assert
    expect(result.succeeded).toBeFalsy();
    expect(result.error.user).toEqual("");
    expect(result.error.password).toEqual("Debe llenar el campo password");
  });
  it("Should return a validation succeded = false both fields have not been filled", () => {
    //Arrange
    const testCredentials: Credentials = {
      user: "",
      password: "",
    };
    //Act
    const result: ValidationResult = validateForm(testCredentials);
    //Assert
    expect(result.succeeded).toBeFalsy();
    expect(result.error.user).toEqual("Debe llenar el campo usuario");
    expect(result.error.password).toEqual("Debe llenar el campo password");
  });
});
