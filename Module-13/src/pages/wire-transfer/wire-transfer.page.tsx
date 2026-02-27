import { AppLayout } from "@/layouts";
import React from "react";
import type { AccountVm, TransferVm } from "./transfer.vm";
import { TransferFormComponent } from "./components";
import { getAccountList, saveTransfer } from "./api/transfer.api";
import {
  mapAccountFromApiToVm,
  mapTransferFromVmToApi,
} from "./transfer.mapper";
import { useParams } from "react-router-dom";
import { PageHeader } from "@/components/page-header.component";
import { PageContainer } from "@/components/page-container.component";

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
      <PageContainer>
        <PageHeader title="Transferencias Nacionales" />
        <TransferFormComponent
          accountList={accountList}
          onTransfer={handleTransfer}
          defaultAccountId={id}
        />
      </PageContainer>
    </AppLayout>
  );
};
