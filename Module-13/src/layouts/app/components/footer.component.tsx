import type React from "react";
import FooterLogo from "/assets/logo_footer.svg";
import styles from "./footer.component.module.css";

export const FooterComponent: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <img className={styles.footerLogo} src={FooterLogo} alt="BankingLogo" />
    </footer>
  );
};
