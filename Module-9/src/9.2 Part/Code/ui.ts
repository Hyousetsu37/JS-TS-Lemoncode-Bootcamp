import { commonPasswords } from "./model";
import { validarClave } from "./motor";

export const submitButton = document.getElementById("submitButton");
export const messageBox = document.getElementById("message");
export const username = document.getElementById("username");
export const password = document.getElementById("password");

const getUsername = () => {
  if (username instanceof HTMLInputElement) {
    return username.value;
  }
  return "";
};
const getPassword = () => {
  if (password instanceof HTMLInputElement) {
    return password.value;
  }
  return "";
};

export const handleSubmit = () => {
  const usernameValue = getUsername();
  const passwordValue = getPassword();
  const result = validarClave(usernameValue, passwordValue, commonPasswords);
  const isValid = result.esValida;
  const messageToShow = isValid ? "Valid password" : result.error;

  if (messageBox instanceof HTMLElement) {
    messageBox.innerHTML = `<span class="${
      isValid ? "valid" : "invalid"
    }">${messageToShow}</span>`;
  }
};
