import type { PropsWithChildren } from "react";
import style from "./page-container.component.module.css";

export const PageContainer: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className={style.container}>{children}</div>;
};
