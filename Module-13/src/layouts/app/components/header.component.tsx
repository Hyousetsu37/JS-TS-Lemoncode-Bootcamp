import type React from "react";
import logoHeader from "/assets/logo_header_white.svg";
import style from "./header.component.module.css";
import { useProfileContext } from "@/core/profile";

export const HeaderComponent: React.FC = () => {
  const { userName } = useProfileContext();
  return (
    <>
      <header className={style.header}>
        <div>
          <img className={style.headerLogo} src={logoHeader} alt="" />
          <div className={style.user}>
            <p>{userName}</p>
          </div>
        </div>
      </header>
    </>
  );
};
