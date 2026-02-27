import { PageHeader } from "@/components/page-header.component";
import { AppLayout } from "@/layouts";
import type React from "react";
import { AccountFormComponent } from "./components/account-form.component";
import { PageContainer } from "../../components/page-container.component";
import type { Account } from "./api/account-api.model";
import { createAccount } from "./api/account.api";
import { useNavigate } from "react-router-dom";

export const AccountPage: React.FC = () => {
  const navigate = useNavigate();

  const handleCreateAccount = async (accountInfo: Account) => {
    const accountCreationResults = await createAccount(accountInfo);
    if (accountCreationResults) {
      alert("Account created correctly");
      navigate("/account-list");
    } else {
      alert("Error al crear la cuenta");
    }
  };
  return (
    <>
      <AppLayout>
        <PageContainer>
          <PageHeader title="Cuentas Bancarias" />
          <AccountFormComponent handleCreateAccount={handleCreateAccount} />
        </PageContainer>
      </AppLayout>
    </>
  );
};
