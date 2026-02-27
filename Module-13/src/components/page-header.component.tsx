import style from "./page-header.component.module.css";

interface PageHeaderProps {
  title: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title }) => {
  return (
    <>
      <h1 className={style.title}>{title}</h1>
    </>
  );
};
