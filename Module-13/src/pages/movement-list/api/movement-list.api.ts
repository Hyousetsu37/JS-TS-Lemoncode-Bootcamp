import type { MovementAPIModel } from "./movement-list.api.model";

const url = `${import.meta.env.VITE_BASE_API_URL}/movements`;

export const getMovements = async (
  accountId: string,
): Promise<MovementAPIModel[]> => {
  const params = new URLSearchParams({ accountId });
  const response = await fetch(`${url}?${params}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};
