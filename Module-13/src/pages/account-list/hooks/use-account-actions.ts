import { generatePath, useNavigate } from "react-router-dom";
import { appRoutes } from "@/core/router";

export const AccountAction = {
  None: "",
  Transfer: "1",
  Movements: "2",
} as const;

export const useAccountActions = () => {
  const navigate = useNavigate();

  const onActionSelected = (accountID: string, action: string) => {
    switch (action) {
      case AccountAction.Transfer:
        navigate(
          generatePath(appRoutes.transferFromAccount, { id: accountID }),
        );
        break;
      case AccountAction.Movements:
        navigate(generatePath(appRoutes.movements, { id: accountID }));
        break;
      default:
        break;
    }
  };
  return { onActionSelected };
};
