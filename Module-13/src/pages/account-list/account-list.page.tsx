import { AppLayout } from "@/layouts";
import React from "react";
import type { AccountVm } from "./account-list.vm";
import styles from "./account-list.module.css";
import { AccountListTableComponent } from "./components";
import { getAccountList } from "./api";
import { mapAccountListFromApitoVm } from "./account-list.mapper";

export const AccountListPage: React.FC = () => {
  const [accountList, setAccountList] = React.useState<AccountVm[]>([]);

  React.useEffect(() => {
    const loadAccountList = async () => {
      try {
        const result = await getAccountList();
        setAccountList(mapAccountListFromApitoVm(result));
      } catch (error) {
        console.error("Error loading accounts", error);
      }
    };
    loadAccountList();
  }, []);
  return (
    <AppLayout>
      <div className={styles.root}>
        <div className={styles.headerContainer}>
          <h1>Mis Cuentas</h1>
          <button>Agregar Nueva Cuenta</button>
        </div>
        <AccountListTableComponent accountList={accountList} />
      </div>
    </AppLayout>
  );
};
