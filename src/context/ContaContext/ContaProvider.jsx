import { useState, useEffect } from "react";
import ContaContext from "./ContaContext";
import api from "./../../services/api.js";

export const ContaProvider = ({ children }) => {
    const [ contas, setContas ] = useState([]);
    const [ contaSelec, setContaSelec ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    
    const fetchContas = async () => {
    try {
      const res = await api.get("/conta/");
      setContas(res.data);

      const savedConta = localStorage.getItem("contaSelec");
      if (savedConta) {
        const contaObj = JSON.parse(savedConta);

        const contaValida = res.data.find(
          (c) => c.idConta === contaObj.idConta
        );
        if (contaValida) {
          setContaSelec(contaValida);
        } else {
          localStorage.removeItem("contaSelec");
        }
      }

      if (res.data.length > 0 && !contaSelec) {
        setContaSelec(res.data[0]);
      }
    } catch (err) {
      console.error("Erro ao buscar contas:", err);
    } finally {
      setLoading(false);
    }
  };

  const selecionarConta = (idConta) => {
    const conta = contas.find((c) => c.idConta === idConta);
    if (conta) {
      setContaSelec(conta);
      localStorage.setItem("contaSelec", JSON.stringify(conta));
    }
  };

  const limparConta = () => {
    setContaSelec(null);
    setContas([]);
    localStorage.removeItem("contaSelec");
  };

  useEffect(() => {
    fetchContas();
  }, []);

  return (
    <ContaContext.Provider
      value={{ contas, contaSelec, selecionarConta, limparConta, fetchContas, loading }}
    >
      {children}
    </ContaContext.Provider>
  );
} 