import { TempNav } from "@/components/temp-nav.component";
import { AppLayout } from "@/layouts";
import type React from "react";

export const MovementListPage: React.FC = () => {
  return (
    <AppLayout>
      Movement lists
      <br />
      <TempNav />
    </AppLayout>
  );
};
