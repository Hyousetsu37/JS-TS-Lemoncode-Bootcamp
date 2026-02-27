import React from "react";
import { accountType } from "../constants/accountConstants";
import { ErrorText } from "../../../components/error-text.component";
import { FormContainerComponent } from "@/components/form-container.component";
import style from "./account-form.component.module.css";
import {
  createEmptyAccount,
  createEmptyAccountErrors,
  type createAccountVm,
} from "../account.vm";
import { validateAccountForm } from "../validations/account-form.validations";

interface AccountFormComponentProps {
  handleCreateAccount: (accountInfo: createAccountVm) => void;
}

export const AccountFormComponent: React.FC<AccountFormComponentProps> = ({
  handleCreateAccount,
}) => {
  const [accountInfo, setAccountInfo] =
    React.useState<createAccountVm>(createEmptyAccount());

  const [errors, setErrors] = React.useState<createAccountVm>(
    createEmptyAccountErrors(),
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formValidationResults = validateAccountForm(accountInfo);
    setErrors(formValidationResults.errors);
    if (formValidationResults.succeeded) {
      handleCreateAccount(accountInfo);
    }
  };

  const hadleFieldChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setAccountInfo((account) => ({
      ...account,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <FormContainerComponent>
          <div>
            <label htmlFor="type">Tipo de Cuenta</label>
            <select name="type" id="type" onChange={hadleFieldChange}>
              <option value="" disabled>
                Seleccione una cuenta
              </option>
              <option value={accountType.ahorro}>Cuenta de Ahorro</option>
              <option value={accountType.corriente}>Cuenta Corriente</option>
              <option value={accountType.nomina}>Cuenta de Nomina</option>
            </select>
            <ErrorText errorText={errors.type} />
          </div>
          <div>
            <label htmlFor="name">Nombre de cuenta</label>
            <input
              type="text"
              name="name"
              id="name"
              className={style.small}
              onChange={hadleFieldChange}
            />
            <ErrorText errorText={errors.name} />
          </div>
        </FormContainerComponent>
        <div className={style.buttonContainer}>
          <button type="submit">Crear Cuenta</button>
        </div>
      </form>
    </div>
  );
};
