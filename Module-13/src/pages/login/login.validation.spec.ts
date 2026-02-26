import type { Credentials, CredentialsFormErrors } from "./login.vm";
import { describe, expect, it } from "vitest";
import { validateForm } from "./login.validation";
import { REQUIRED_FIELD_MESSAGE } from "@/common/validations/validation.const";
import type { FormValidationResult } from "@/common/validations/validation.model";

describe("login.validation specs", () => {
  it("Should return a validation succeded = true when both fields have been filled", () => {
    //Arrange
    const testCredentials: Credentials = {
      user: "testUser",
      password: "testPassword",
    };
    //Act
    const result: FormValidationResult<CredentialsFormErrors> =
      validateForm(testCredentials);
    //Assert
    expect(result.succeeded).toBeTruthy();
    expect(result.errors.user).toEqual("");
    expect(result.errors.password).toEqual("");
  });
  it("Should return a validation succeded = false whenthe username has not been filled", () => {
    //Arrange
    const testCredentials: Credentials = {
      user: "",
      password: "testPassword",
    };
    //Act
    const result: FormValidationResult<CredentialsFormErrors> =
      validateForm(testCredentials);
    //Assert
    expect(result.succeeded).toBeFalsy();
    expect(result.errors.user).toEqual(REQUIRED_FIELD_MESSAGE);
    expect(result.errors.password).toEqual("");
  });
  it("Should return a validation succeded = false when the password has not been filled", () => {
    //Arrange
    const testCredentials: Credentials = {
      user: "testUser",
      password: "",
    };
    //Act
    const result: FormValidationResult<CredentialsFormErrors> =
      validateForm(testCredentials);
    //Assert
    expect(result.succeeded).toBeFalsy();
    expect(result.errors.user).toEqual("");
    expect(result.errors.password).toEqual(REQUIRED_FIELD_MESSAGE);
  });
  it("Should return a validation succeded = false both fields have not been filled", () => {
    //Arrange
    const testCredentials: Credentials = {
      user: "",
      password: "",
    };
    //Act
    const result: FormValidationResult<CredentialsFormErrors> =
      validateForm(testCredentials);
    //Assert
    expect(result.succeeded).toBeFalsy();
    expect(result.errors.user).toEqual(REQUIRED_FIELD_MESSAGE);
    expect(result.errors.password).toEqual(REQUIRED_FIELD_MESSAGE);
  });
});
