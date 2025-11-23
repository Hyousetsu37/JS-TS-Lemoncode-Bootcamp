import type React from "react";
import styles from "./app-layout.module.css";
import {
  FooterComponent,
  HeaderComponent,
  NavbarComponent,
} from "./components";

interface Props {
  children: React.ReactNode;
}

export const AppLayout: React.FC<Props> = (props) => {
  const { children } = props;

  return (
    <>
      <HeaderComponent />
      <NavbarComponent />
      <main className={styles.mainContent}>{children}</main>
      <FooterComponent />
    </>
  );
};
