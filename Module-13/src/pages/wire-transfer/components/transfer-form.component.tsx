import React from "react";
import {
  createEmptyTransferError,
  createEmptyTransferVm,
  type AccountVm,
  type TransferVm,
} from "../transfer.vm";

import type { TransferError } from "../transfer.vm";
import { validateForm } from "../validations";

import style from "./transfer-form.component.module.css";

interface TransferFormProps {
  accountList: AccountVm[];
  onTransfer: (transferInfo: TransferVm) => void;
  defaultAccountId?: string;
}

export const TransferFormComponent: React.FC<TransferFormProps> = ({
  accountList,
  onTransfer,
  defaultAccountId,
}) => {
  const [transfer, setTransfer] = React.useState<TransferVm>(
    createEmptyTransferVm(),
  );

  const [errors, setErrors] = React.useState<TransferError>(
    createEmptyTransferError(),
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formValidationResult = validateForm(transfer);
    setErrors(formValidationResult.errors);
    if (formValidationResult.succeeded) {
      onTransfer(transfer);
    }
  };

  const handleFieldChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setTransfer((transfer) => ({
      ...transfer,
      [e.target.name]: e.target.value,
    }));
  };

  React.useEffect(() => {
    setTransfer((transfer) => ({
      ...transfer,
      accountId: defaultAccountId ?? "",
    }));
  }, [defaultAccountId]);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className={style.formContainer}>
          <div>
            <label htmlFor="">Seleccione cuenta origen</label>
            <select
              name="accountId"
              id=""
              onChange={handleFieldChange}
              value={transfer.accountId}
              className={style.large}
            >
              <option value="" disabled>
                Seleccione una cuenta
              </option>
              {accountList.map((account) => (
                <option key={account.id} value={account.id}>
                  {account.alias}
                </option>
              ))}
            </select>
            <p className={style.error}>{errors.accountId}</p>
          </div>
          <div>
            <label htmlFor="">Ingrese el IBAN de destino</label>
            <input
              type="text"
              name="iban"
              onChange={handleFieldChange}
              className={style.large}
            />
            <p className={style.error}>{errors.iban}</p>
          </div>
          <div>
            <label htmlFor="">Beneficiario</label>
            <input
              type="text"
              name="name"
              onChange={handleFieldChange}
              className={style.large}
            />
            <p className={style.error}>{errors.name}</p>
          </div>
          <div>
            <label htmlFor="">Importe</label>
            <input
              type="number"
              name="amount"
              onChange={handleFieldChange}
              className={style.small}
            />
            <p className={style.error}>{errors.amount}</p>
          </div>
          <div>
            <label htmlFor="concept">Concepto</label>
            <input
              type="text"
              name="concept"
              onChange={handleFieldChange}
              className={style.large}
            />
            <p className={style.error}>{errors.concept}</p>
          </div>
          <div>
            <label htmlFor="notes">Observaciones</label>
            <input
              type="text"
              name="notes"
              onChange={handleFieldChange}
              className={style.large}
            />
            <p className={style.error}>{errors.notes}</p>
          </div>
        </div>

        <div className={style.formContainer}>
          <div>
            <p>
              Para que la transferencia se realice en otra fecha diferente a la
              de hoy, por favor, indiquenos la fecha de ejecucion:
            </p>
            <div>
              <label htmlFor="realDateTransfer">Fecha de ejecucion:</label>
              <input
                type="date"
                name="realDateTransfer"
                onChange={handleFieldChange}
              />
              <p className={style.error}>{errors.realDateTransfer}</p>
            </div>
          </div>
        </div>
        <div className={style.formContainer}>
          <div>
            <p>
              Escriba una dirección de email para dar aviso al beneficiario:
            </p>
            <div>
              <label htmlFor="email">Email del beneficiario:</label>
              <input
                type="email"
                name="email"
                onChange={handleFieldChange}
                className={style.large}
              />
              <p className={style.error}>{errors.email}</p>
            </div>
          </div>
        </div>
        <div className={style.buttonContainer}>
          <button className={style.button} type="submit">
            Realiar la transferencia
          </button>
        </div>
      </form>
    </div>
  );
};
