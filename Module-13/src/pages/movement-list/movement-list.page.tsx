import { AppLayout } from "@/layouts";
import type React from "react";
import type { MovementVm } from "./movement-list.vm";
import { useEffect, useState } from "react";
import { getMovements } from "./api";
import { mapMovementListFromApitoVm } from "./movement-list.mapper";
import { useParams } from "react-router-dom";
import { MovementListTableComponent } from "./movement-list.table.component";
import styles from "./movement-list.module.css";
import { MovementListHeaderComponent } from "./components/movement-list.header.component";
import { getAccountList } from "../account-list/api";
import type { AccountVm } from "../account-list/account-list.vm";
import { mapAccountListFromApitoVm } from "../account-list/account-list.mapper";

export const MovementListPage: React.FC = () => {
  const [movementList, setMovementList] = useState<MovementVm[]>([]);
  const [account, setAccount] = useState<AccountVm>();
  const { id: accountId } = useParams<{ id: string }>();

  useEffect(() => {
    const loadAccount = async () => {
      try {
        const result = await getAccountList();
        const singleAccountResult = result.filter((account) => {
          return account.id === accountId;
        });
        if (singleAccountResult) {
          setAccount(mapAccountListFromApitoVm(singleAccountResult)[0]);
        }
      } catch (error) {
        console.error("Error loading the account", error);
      }
    };
    loadAccount();
  }, [accountId]);

  useEffect(() => {
    const loadMovementList = async () => {
      try {
        if (accountId) {
          const result = await getMovements(accountId);
          setMovementList(mapMovementListFromApitoVm(result));
        }
      } catch (error) {
        console.error("Error loading movements", error);
      }
    };
    loadMovementList();
  }, [accountId, account]);

  return (
    <AppLayout>
      <div className={styles.root}>
        {account && <MovementListHeaderComponent account={account} />}
        <MovementListTableComponent movementList={movementList} />
      </div>
    </AppLayout>
  );
};
