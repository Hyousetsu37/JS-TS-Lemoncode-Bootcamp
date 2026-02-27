export interface accountCreationError {
  type: string;
  name: string;
}

export interface createAccountVm {
  type: string;
  name: string;
}

export const createEmptyAccount = (): createAccountVm => ({
  type: "",
  name: "",
});

export const createEmptyAccountErrors = (): accountCreationError => ({
  type: "",
  name: "",
});
