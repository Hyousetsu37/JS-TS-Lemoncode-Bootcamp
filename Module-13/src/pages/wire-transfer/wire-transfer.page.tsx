import { TempNav } from "@/components/temp-nav.component";
import { AppLayout } from "@/layouts";
import React from "react";
import type { AccountVm, TransferVm } from "./transfer.vm";
import { TransferFormComponent } from "./components";

const accountListMock: AccountVm[] = [
  { id: "1", alias: "Cuenta principal", iban: "ES91 2100 0418 4502 0005 1332" },
  { id: "2", alias: "Cuenta ahorro", iban: "ES91 2100 0418 4502 0005 1332" },
  { id: "3", alias: "Cuenta nomina", iban: "ES91 2100 0418 4502 0005 1332" },
];

export const WireTransferPage: React.FC = () => {
  const [accountList, setAccountList] = React.useState<AccountVm[]>([]);

  React.useEffect(() => {
    setAccountList(accountListMock);
  }, []);

  const handleTransfer = (transferInfo: TransferVm) => {
    console.log(transferInfo);
  };
  return (
    <AppLayout>
      <TransferFormComponent
        accountList={accountList}
        onTransfer={handleTransfer}
      />
    </AppLayout>
  );
};
