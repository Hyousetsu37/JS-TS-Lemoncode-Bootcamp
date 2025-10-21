import React from "react";

import "./style.css";
import { AccountPage } from "@pages/index";
// import { AccountPage } from "@pages/account/account.page";

export const App: React.FC = () => {
  return (
    <>
      <h1>Punto de partida app Banca</h1>
      <AccountPage />
    </>
  );
};
