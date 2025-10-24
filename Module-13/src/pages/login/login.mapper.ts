import * as apiModel from "./api/login.api-model";
import * as viewModel from "./login.vm";

export const mapCredentialsFromVmToAPI = (
  credentials: viewModel.Credentials
): apiModel.CredentialsAPI => {
  return {
    user: credentials.user,
    password: credentials.password,
  };
};
