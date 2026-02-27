import type { PropsWithChildren } from "react";
import style from "./form-container.component.module.css";

export const FormContainerComponent: React.FC<PropsWithChildren> = ({
  children,
}) => {
  return <div className={style.formContainer}>{children}</div>;
};
