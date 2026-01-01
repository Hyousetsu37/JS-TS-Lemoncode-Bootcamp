import React from "react";

import "./style.css";
import { Router } from "./core/router";
import { ProfileProvider } from "./core/profile";
// import { AccountPage } from "@pages/account/account.page";

export const App: React.FC = () => {
  return (
    <ProfileProvider>
      <Router />
    </ProfileProvider>
  );
};
