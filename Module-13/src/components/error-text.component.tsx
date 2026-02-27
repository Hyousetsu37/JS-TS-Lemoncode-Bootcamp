import style from "./error-text.component.module.css";

interface ErrorTextProps {
  errorText: string;
}

export const ErrorText: React.FC<ErrorTextProps> = ({ errorText }) => {
  return <p className={style.error}>{errorText}</p>;
};
