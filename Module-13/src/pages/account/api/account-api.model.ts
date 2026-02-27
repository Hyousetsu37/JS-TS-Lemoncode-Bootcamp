export interface Account {
  type: string;
  name: string;
}

export interface AccountApiResponse {
  id: string;
  iban: string;
  name: string;
  balance: string;
  lastTransaction: Date;
}
