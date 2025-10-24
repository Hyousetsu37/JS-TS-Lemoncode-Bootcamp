import { BrowserRouter, Route, Routes } from "react-router-dom";
import { appRoutes } from "./routes";
import {
  AccountListPage,
  AccountPage,
  LoginPage,
  MovementListPage,
  WireTransferPage,
} from "@/pages";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={appRoutes.root} element={<LoginPage />} />
        <Route path={appRoutes.accountList} element={<AccountListPage />} />
        <Route path={appRoutes.editAccount} element={<AccountPage />} />
        <Route path={appRoutes.movements} element={<MovementListPage />} />
        <Route path={appRoutes.transfer} element={<WireTransferPage />} />
        <Route
          path={appRoutes.transferFromAccount}
          element={<WireTransferPage />}
        />
      </Routes>
    </BrowserRouter>
  );
};
