import * as apiModel from "./api/movement-list.api.model";
import * as viewModel from "./movement-list.vm";

export const mapMovementListFromApitoVm = (
  movementList: apiModel.MovementAPIModel[],
): viewModel.MovementVm[] =>
  movementList.map((movement) => ({
    id: movement.id,
    accountId: movement.accountId,
    amount: movement.amount.toLocaleString("ES-es"),
    balance: movement.balance.toLocaleString("ES-es"),
    description: movement.description,
    realTransaction: new Date(movement.realTransaction),
    transaction: new Date(movement.transaction),
  }));
