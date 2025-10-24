import { appRoutes } from "@/core/router";
import React from "react";
import { generatePath, Link } from "react-router-dom";

export const TempNav: React.FC = () => {
  return (
    <nav>
      <Link to={appRoutes.root}>Login</Link>
      <Link to={appRoutes.accountList}>Mis cuentas</Link>
      <Link to={generatePath(appRoutes.editAccount, { id: 1 })}>
        Mis cuentas
      </Link>
      <Link to={generatePath(appRoutes.movements, { id: 1 })}>Movimientos</Link>
      <Link to={appRoutes.transfer}>Transferir</Link>
      <Link to={generatePath(appRoutes.transferFromAccount, { id: 1 })}>
        Transferir desde cuenta 1
      </Link>
    </nav>
  );
};
