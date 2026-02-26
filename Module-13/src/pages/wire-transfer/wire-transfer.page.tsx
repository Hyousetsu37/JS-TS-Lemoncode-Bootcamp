import { AppLayout } from "@/layouts";
import React from "react";
import type { AccountVm, TransferVm } from "./transfer.vm";
import { TransferFormComponent } from "./components";
import style from "./transfer.page.module.css";
import { getAccountList, saveTransfer } from "./api/transfer.api";
import {
  mapAccountFromApiToVm,
  mapTransferFromVmToApi,
} from "./transfer.mapper";
import { useParams } from "react-router-dom";

export const WireTransferPage: React.FC = () => {
  const [accountList, setAccountList] = React.useState<AccountVm[]>([]);
  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    const asyncFunc = async () => {
      const accountListApi = await getAccountList();
      const accountListVm = accountListApi.map((account) =>
        mapAccountFromApiToVm(account),
      );
      setAccountList(accountListVm);
    };

    asyncFunc();
  }, []);

  const handleTransfer = (transferInfo: TransferVm) => {
    const asyncFunc = async () => {
      const transferApi = mapTransferFromVmToApi(transferInfo);
      const transferResult = await saveTransfer(transferApi);
      if (transferResult) {
        alert("Transferencia realizada con exito");
      } else {
        alert("Error al realizar la transferencia");
      }
    };
    asyncFunc();
  };
  return (
    <AppLayout>
      <div className={style.container}>
        <h1 className={style.title}>Transferencias Nacionales</h1>
        <TransferFormComponent
          accountList={accountList}
          onTransfer={handleTransfer}
          defaultAccountId={id}
        />
      </div>
    </AppLayout>
  );
};
