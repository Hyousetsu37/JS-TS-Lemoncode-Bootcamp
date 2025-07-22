import {
  askButtonHandler,
  stayButtonHandler,
  afterButtonHandler,
  resetButtonHandler,
  askCardButton,
  stayButton,
  resetButton,
  afterButton,
} from "./ui";
import { muestraPuntuacion } from "./ui";

//invocar cuando el Dom este listo
document.addEventListener("DOMContentLoaded", muestraPuntuacion);

askCardButton?.addEventListener("click", askButtonHandler);
stayButton?.addEventListener("click", stayButtonHandler);
resetButton?.addEventListener("click", resetButtonHandler);
afterButton?.addEventListener("click", afterButtonHandler);
