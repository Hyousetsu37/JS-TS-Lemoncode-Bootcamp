import { mapCredentialsFromVmToAPI } from "./login.mapper";
import type { Credentials } from "./login.vm";
import type { CredentialsAPI } from "./api/login.api-model";
import { describe, expect, it } from "vitest";

describe("login.mapper specs", () => {
  it("Should return a credential with the same properties", () => {
    //Arrange
    const testCredentials: Credentials = {
      user: "testUser",
      password: "testPass",
    };
    const expectedCredentials: CredentialsAPI = {
      user: "testUser",
      password: "testPass",
    };
    //Act
    const result: CredentialsAPI = mapCredentialsFromVmToAPI(testCredentials);
    //Assert
    expect(result).toEqual(expectedCredentials);
  });
});
