import type { Account, AccountApiResponse } from "./account-api.model";

const urlCreateAccount = `${import.meta.env.VITE_BASE_API_URL}/account-list`;

export const createAccount = async (
  account: Account,
): Promise<AccountApiResponse> => {
  const response = await fetch(urlCreateAccount, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(account),
  });
  if (!response.ok) {
    throw new Error(`Error: ${response.status}. Couldn't create an account`);
  }
  return response.json();
};
