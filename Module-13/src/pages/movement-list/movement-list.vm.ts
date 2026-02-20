export interface MovementVm {
  id: string;
  transaction: Date;
  realTransaction: Date;
  description: string;
  amount: string;
  balance: string;
  accountId: string;
}
