import type { AccountAPIModel } from "./account-list.api.model";

const url = `${import.meta.env.VITE_BASE_API_URL}/account-list`;

export const getAccountList = async (): Promise<AccountAPIModel[]> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error ${response.status}: Can't fetch the list`);
  }
  const data = await response.json();
  return data as AccountAPIModel[];
};
