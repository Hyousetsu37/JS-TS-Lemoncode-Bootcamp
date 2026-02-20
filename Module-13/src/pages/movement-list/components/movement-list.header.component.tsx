import React from "react";
import styles from "./movement-list.header.component.module.css";
import type { AccountVm } from "@/pages/account-list/account-list.vm";
import { formatCurrency } from "@/core/helpers/formatcurrency";

interface MovementListHeaderComponentProps {
  account: AccountVm;
}

export const MovementListHeaderComponent: React.FC<
  MovementListHeaderComponentProps
> = ({ account }) => {
  return (
    <>
      <div className={styles.headerContainer}>
        <div className={styles.topContainer}>
          <h1>Saldos y Últimos movimientos</h1>
          <div className={styles.balanceContainer}>
            <span className={styles.label}>Saldo Disponible</span>
            <span className={styles.balance}>
              {formatCurrency(Number(account.balance))}
            </span>
          </div>
        </div>
        <div className={styles.bottomContainer}>
          <h2>{`Alias: ${account.name}`}</h2>
          <span>{`IBAN: ${account.iban}`}</span>
        </div>
      </div>
    </>
  );
};

{
  /* <div className={styles.headerContainer}>
          <h1>Mis Cuentas</h1>
          <button>Agregar Nueva Cuenta</button>
        </div> */
}
