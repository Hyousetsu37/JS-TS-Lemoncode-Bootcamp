import { handleSubmit, submitButton } from "../../ui";
import "./style.css";

document.addEventListener("DOMContentLoaded", () => {
  submitButton?.addEventListener("click", handleSubmit);
});
