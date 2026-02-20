export interface MovementAPIModel {
  id: string;
  transaction: string;
  realTransaction: string;
  description: string;
  amount: number;
  balance: number;
  accountId: string;
}
