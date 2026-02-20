import React from "react";
import type { AccountVm } from "../account-list.vm";
import style from "./account-list-item.component.module.css";
import { generatePath, Link } from "react-router-dom";
import { appRoutes } from "@/core/router";
import { AccountAction, useAccountActions } from "../hooks/use-account-actions";
import { formatCurrency } from "@/core/helpers/formatcurrency";

interface AccountListItemProps {
  accountItem: AccountVm;
}

export const AccountListItemComponent: React.FC<AccountListItemProps> = ({
  accountItem,
}) => {
  const { onActionSelected } = useAccountActions();

  const handleSelectedChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onActionSelected(accountItem.id, e.target.value);
  };

  const movementsPath = generatePath(appRoutes.movements, {
    id: accountItem.id,
  });

  return (
    <div className={style.row} role="row">
      <span className={`${style.dataCell} ${style.bold}`} role="gridcell">
        <Link to={movementsPath}>{accountItem.iban}</Link>
      </span>
      <span className={style.dataCell} role="gridcell">
        {accountItem.name}
      </span>
      <span className={`${style.dataCell} ${style.alignRight}`} role="gridcell">
        {formatCurrency(Number(accountItem.balance))}
      </span>
      <span className={`${style.dataCell} ${style.alignRight}`} role="gridcell">
        {accountItem.lastTransaction.toLocaleDateString("es-ES")}
      </span>
      <span
        className={`${style.dataCell} ${style.selectContainer}`}
        role="gridcell"
      >
        <select
          className={style.select}
          name=""
          id=""
          aria-label={`Acciones para la cuenta ${accountItem.name}`}
          value={AccountAction.None}
          onChange={handleSelectedChange}
        >
          <option value={AccountAction.None} disabled>
            Seleccionar
          </option>
          <option value={AccountAction.Transfer}>Transferir</option>
          <option value={AccountAction.Movements}>Movimientos</option>
        </select>
      </span>
    </div>
  );
};
