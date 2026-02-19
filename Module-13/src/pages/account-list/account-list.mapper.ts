import * as apiModel from "./api/account-list.api.model";
import * as viewModel from "./account-list.vm";

export const mapAccountListFromApitoVm = (
  accountList: apiModel.AccountAPIModel[],
): viewModel.AccountVm[] =>
  accountList.map((account) => ({
    id: account.id,
    iban: account.iban,
    name: account.name,
    balance: account.balance.toString(),
    lastTransaction: new Date(account.lastTransaction),
  }));
