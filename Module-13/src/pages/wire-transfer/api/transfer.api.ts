import type { Account, Transfer } from "./transfer.api-model";

const urlAccount = `${import.meta.env.VITE_BASE_API_URL}/account-list`;

export const getAccountList = async (): Promise<Account[]> => {
  const response = await fetch(urlAccount);
  if (!response.ok) {
    throw new Error(`Error: ${response.status}, can't fetch the accounts`);
  }
  return response.json();
};

const urlTransfer = `${import.meta.env.VITE_BASE_API_URL}/transfer`;

export const saveTransfer = async (transfer: Transfer): Promise<boolean> => {
  const response = await fetch(urlTransfer, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(transfer),
  });
  if (!response.ok) {
    throw new Error(`Error: ${response.status}, couldn't save transfer`);
  }
  return response.json();
};
