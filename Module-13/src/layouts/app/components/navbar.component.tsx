import { appRoutes, routesPrefixes } from "@/core/router";
import type React from "react";
import styles from "./navbar.component.module.css";
import { NavLinkItem } from "./NavLinkItem.component";

export const NavbarComponent: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.list}>
        <NavLinkItem
          activePathPrefix={routesPrefixes.accountList}
          targetPath={appRoutes.accountList}
          label="Mis Cuentas"
        />
        <NavLinkItem
          activePathPrefix={routesPrefixes.transfer}
          targetPath={appRoutes.transfer}
          label="Transferencias"
        />
      </ul>
    </nav>
  );
};
