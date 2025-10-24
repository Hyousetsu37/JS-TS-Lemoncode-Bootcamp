import type { CredentialsAPI } from "./login.api-model";

const url = `${import.meta.env.VITE_BASE_API_URL}/login`;

export const isValidLogin = async (
  credentials: CredentialsAPI
): Promise<boolean> => {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  const isValid: boolean = await response.json();
  return isValid;
};
