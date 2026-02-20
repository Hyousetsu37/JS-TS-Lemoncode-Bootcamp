import { MovementListItemComponent } from "./components/movement-list-item.component";
import style from "./movement-list.table.component.module.css";
import type { MovementVm } from "./movement-list.vm";

interface MovementListTableProps {
  movementList: MovementVm[];
}

export const MovementListTableComponent: React.FC<MovementListTableProps> = ({
  movementList,
}) => {
  return (
    <>
      <div className={style.gridContainer}>
        <div className={style.gridTable}>
          <div className={style.headerTable}>
            <span className={style.headerCell}>Fecha</span>
            <span className={style.headerCell}>Fecha Valor</span>
            <span className={style.headerCell}>Descripción</span>
            <span className={style.headerCell}>Importe</span>
            <span className={style.headerCell}>Saldo Disponible</span>
          </div>
          {movementList.map((movement) => (
            <MovementListItemComponent
              movementItem={movement}
              key={movement.id}
            />
          ))}
        </div>
      </div>
    </>
  );
};
