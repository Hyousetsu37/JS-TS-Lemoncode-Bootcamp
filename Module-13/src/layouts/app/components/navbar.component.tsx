import { appRoutes, routesPrefixes } from "@/core/router";
import type React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./navbar.component.module.css";

export const NavbarComponent: React.FC = () => {
  const { pathname } = useLocation();
  return (
    <nav className={styles.navbar}>
      <ul className={styles.list}>
        <li
          className={
            pathname.startsWith(routesPrefixes.accountList)
              ? styles.selected
              : ""
          }
        >
          <Link to={appRoutes.accountList}>Mis cuentas</Link>
        </li>
        <li
          className={
            pathname.startsWith(routesPrefixes.transfer) ? styles.selected : ""
          }
        >
          <Link to={appRoutes.transfer}> Transferencias</Link>
        </li>
      </ul>
    </nav>
  );
};
