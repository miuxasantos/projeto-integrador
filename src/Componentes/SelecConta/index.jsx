import React from "react";
import { useConta } from "../../context/ContaContext/useConta";

const SelecConta = () => {
    const { contas, selecionarConta, contaSelec } = useConta();

    return (
    <div>
      <h2>Selecione sua conta</h2>
      {contas.length === 0 ? (
        <p>Você ainda não possui contas cadastradas.</p>
      ) : (
        <ul>
          {contas.map((conta) => (
            <li key={conta.idConta}>
              <button onClick={() => {console.log("Conta selecionada");
                selecionarConta(conta.idConta)}}>
                {conta.nome} (Saldo: {conta.saldo})
                {contaSelec?.idConta === conta.idConta && console.log("Conta selecionada")}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelecConta;