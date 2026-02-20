import React from "react";
import type { MovementVm } from "../movement-list.vm";
import style from "./movement-list-item.component.module.css";
import { formatCurrency } from "@/core/helpers/formatcurrency";

interface MovementListItemProps {
  movementItem: MovementVm;
}

export const MovementListItemComponent: React.FC<MovementListItemProps> = ({
  movementItem,
}) => {
  const numberAmount = Number(movementItem.amount);
  const numberBalance = Number(movementItem.balance);
  const isPositive = numberAmount >= 0;
  return (
    <div className={style.row} role="row">
      <span className={style.dataCell}>
        {movementItem.transaction.toLocaleString("ES-es")}
      </span>
      <span className={style.dataCell}>
        {movementItem.realTransaction.toLocaleString("ES-es")}
      </span>
      <span className={style.dataCell}>{movementItem.description}</span>
      <span
        className={`${style.dataCell} ${style.alignRight} ${isPositive ? style.in : style.out}`}
      >
        {formatCurrency(numberAmount)}
      </span>
      <span className={`${style.dataCell} ${style.alignRight}`}>
        {formatCurrency(numberBalance)}
      </span>
    </div>
  );
};
