import * as apiModel from "./api/account-list.api.model";
import { mapAccountListFromApitoVm } from "./account-list.mapper";
import { expect, describe, it } from "vitest";

describe("pages/account-list/api/account-list.mapper tests", () => {
  describe("mapAccountListFromApitoVmToVm", () => {
    it("should return empty array when it is fed an empty array", () => {
      //Arrange
      const accountList: apiModel.AccountAPIModel[] = [];
      //Act
      const result = mapAccountListFromApitoVm(accountList);
      //Assert
      expect(result).toEqual([]);
    });
    it("Should returnt the same array but using VM model structure", () => {
      //Arrange
      const accountList: apiModel.AccountAPIModel[] = [
        {
          id: "1",
          iban: "ES91...",
          type: "1",
          name: "Gastos",
          balance: 1400,
          lastTransaction: "2019-12-09T21:30:00",
        },
        {
          id: "2",
          iban: "ES92...",
          type: "2",
          name: "Ingresos",
          balance: 1500,
          lastTransaction: "2019-13-09T21:30:00",
        },
      ];
      //Act
      const result = mapAccountListFromApitoVm(accountList);
      //Assert
      expect(result).toEqual([
        {
          id: "1",
          iban: "ES91...",
          name: "Gastos",
          balance: "1400",
          lastTransaction: new Date("2019-12-09T21:30:00"),
        },
        {
          id: "2",
          iban: "ES92...",
          name: "Ingresos",
          balance: "1500",
          lastTransaction: new Date("2019-13-09T21:30:00"),
        },
      ]);
    });
  });
});
