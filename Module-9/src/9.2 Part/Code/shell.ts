import "./style.css";
import { handleSubmit, submitButton } from "./ui";

document.addEventListener("DOMContentLoaded", () => {
  if (submitButton instanceof HTMLButtonElement) {
    submitButton.addEventListener("click", handleSubmit);
  }
});
