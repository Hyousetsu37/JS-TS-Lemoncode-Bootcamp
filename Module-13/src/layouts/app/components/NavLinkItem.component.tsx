import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./navLinkItem.component.module.css";

interface NavLinkItemProps {
  activePathPrefix: string;
  targetPath: string;
  label: string;
}

export const NavLinkItem: React.FC<NavLinkItemProps> = ({
  activePathPrefix,
  targetPath,
  label,
}) => {
  const { pathname } = useLocation();
  const isActive = pathname.startsWith(activePathPrefix);
  return (
    <li className={isActive ? styles.active : ""}>
      <Link to={targetPath}>{label}</Link>
    </li>
  );
};
