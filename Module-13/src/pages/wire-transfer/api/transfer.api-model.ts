export interface Account {
  id: string;
  iban: string;
  type: string;
  name: string;
  balance: string;
  lastTransaction: string;
}

export interface Transfer {
  accountId: string;
  iban: string;
  name: string;
  amount: number;
  concept: string;
  notes: string;
  trasferDate: string;
  realTransferDate: string;
}
