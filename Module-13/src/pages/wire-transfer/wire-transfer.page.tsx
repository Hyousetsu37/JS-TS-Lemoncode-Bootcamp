import { TempNav } from "@/components/temp-nav.component";
import { AppLayout } from "@/layouts";
import type React from "react";

export const WireTransferPage: React.FC = () => {
  return (
    <AppLayout>
      Movement from <br />
      <TempNav />
    </AppLayout>
  );
};
