import React from "react";
import type { AccountVm } from "../account-list.vm";
import style from "./account-list-table.component.module.css";
import { AccountListItemComponent } from "./account-list-item.component";

interface AccountListTableProps {
  accountList: AccountVm[];
}

export const AccountListTableComponent: React.FC<AccountListTableProps> = (
  props,
) => {
  const { accountList } = props;

  return (
    <>
      <div className={style.gridContainer}>
        <div className={style.gridTable}>
          <div className={style.headerTable}>
            <span className={style.headerCell}>Iban</span>
            <span className={style.headerCell}>Alias</span>
            <span className={style.headerCell}>Saldo Disponible</span>
            <span className={style.headerCell}>Ultima Operación</span>
            <span className={style.headerCell}>Operación</span>
          </div>
          {accountList.map((account) => (
            <AccountListItemComponent key={account.id} accountItem={account} />
          ))}
        </div>
      </div>
    </>
  );
};
