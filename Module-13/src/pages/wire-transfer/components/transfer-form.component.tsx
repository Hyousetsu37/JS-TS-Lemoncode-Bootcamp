import React from "react";
import {
  createEmptyTransferVm,
  type AccountVm,
  type TransferVm,
} from "../transfer.vm";

interface TransferFormProps {
  accountList: AccountVm[];
  onTransfer: (transferInfo: TransferVm) => void;
}

export const TransferFormComponent: React.FC<TransferFormProps> = ({
  accountList,
  onTransfer,
}) => {
  const [transfer, setTransfer] = React.useState<TransferVm>(
    createEmptyTransferVm(),
  );
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onTransfer(transfer);
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
  return (
    <div>
      <h2>Transfer</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="">Seleccione cuenta origen</label>
          <select
            name="accountId"
            id=""
            onChange={handleFieldChange}
            value={transfer.accountId}
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
        </div>
        <div>
          <label htmlFor="">Ingrese el IBAN de destino</label>
          <input type="text" name="iban" onChange={handleFieldChange} />
        </div>
        <div>
          <label htmlFor="">Beneficiario</label>
          <input type="text" name="name" onChange={handleFieldChange} />
        </div>
        <div>
          <label htmlFor="">Importe</label>
          <input type="number" name="amount" onChange={handleFieldChange} />
        </div>
        <div>
          <label htmlFor="concept">Concepto</label>
          <input type="text" name="concept" onChange={handleFieldChange} />
        </div>
        <div>
          <label htmlFor="notes">Observaciones</label>
          <input type="text" name="notes" onChange={handleFieldChange} />
        </div>
        <div>
          <p>
            Para que la transferencia se realice en otra fecha diferente a la de
            hoy, por favor, indiquenos la fecha de ejecucion:
          </p>
          <div>
            <label htmlFor="realDateTransfer">Fecha de ejecucion:</label>
            <input
              type="date"
              name="realDateTransfer"
              onChange={handleFieldChange}
            />
          </div>
        </div>
        <div>
          <p>Escriba una dirección de email para dar aviso al beneficiario:</p>
          <div>
            <label htmlFor="email">Email del beneficiario:</label>
            <input type="email" name="email" onChange={handleFieldChange} />
          </div>
        </div>
        <button type="submit">Realiar la transferencia</button>
      </form>
    </div>
  );
};
