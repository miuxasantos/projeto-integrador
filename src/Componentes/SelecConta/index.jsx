import React, { useEffect, useState } from "react";
import { useConta } from "../../context/ContaContext/useConta";

const SelecConta = () => {
    const { contas, selecionarConta, contaSelec } = useConta();
    const [selectedAcc, setSelectedAcc] = useState(null);

    useEffect(() => {
      if (contaSelec) {
        setSelectedAcc(contaSelec.idConta);
      }
    }, [contaSelec])

    const handleSelectAcc = (idConta) => {
      console.log("Conta selecionada " + idConta);
      setSelectedAcc(idConta);
      selecionarConta(idConta);
    }

    return (
    <div>
      <h2>Selecione sua conta</h2>
      {contas.length === 0 ? (
        <p>Você ainda não possui contas cadastradas.</p>
      ) : (
        <ul>
          {contas.map((conta) => (
            <li key={conta.idConta}>
              <button 
                className={`account-button ${selectedAcc === conta.idConta ? 'selected' : ''}`}
              onClick={() => handleSelectAcc(conta.idConta)}>
                <span className="account-name">{conta.nome}</span>
                <span className="account-balance">Saldo: R$ {conta.saldo.toFixed(2)}</span>
                {selectedAcc === conta.idConta && (
                  <span className="selected-indicator">Selecionada</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelecConta;