import { useState, useEffect, useCallback } from "react";
import ContaContext from "./ContaContext";
import api from "./../../services/api.js";
import useAuth from "../AuthContext/useAuth.jsx";

export const ContaProvider = ({ children }) => {
  const [ contas, setContas ] = useState([]);
  const [ contaSelec, setContaSelec ] = useState(() => {
    const storedConta = localStorage.getItem("contaSelec");
    return storedConta ? JSON.parse(storedConta) : null;
  });
  const [ loading, setLoading ] = useState(true);
  const { token, usuario } = useAuth();
    
  const fetchContas = useCallback(async () => {

    if (!token || !usuario?.idUsuario) {
      console.log("Token não disponível no contexto, aguardando...");
      setContas([]);
      setContaSelec(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const res = await api.get("/conta");
      setContas(res.data);

      // Seleciona conta salva ou a primeira disponível
      const savedConta = localStorage.getItem("contaSelec");
      let contaValida = null;

      if (savedConta) {
        const parsed = JSON.parse(savedConta);
        contaValida = res.data.find(c => c.idConta === parsed.idConta);
      }

      if (!contaValida && res.data.length > 0) {
        contaValida = res.data[0];
      }

      if (contaValida && contaValida.idConta !== contaSelec?.idConta) {
        console.log("🔄 Atualizando conta selecionada:", contaValida.idConta);
        setContaSelec(contaValida);
        localStorage.setItem("contaSelec", JSON.stringify(contaValida));
      } else if (!contaValida && contaSelec) {
        console.log("🔄 Limpando conta selecionada");
        setContaSelec(null);
        localStorage.removeItem("contaSelec");
      }

    } catch (err) {
      console.error("Erro ao buscar contas:", err);
      setContaSelec(null);
    } finally {
      setLoading(false);
    }
  }, [token, usuario?.idUsuario]);

  useEffect(() => {
    if (token) {
      fetchContas();
    }
  }, [token, fetchContas]);

  const selecionarConta = useCallback((idConta) => {
    const conta = contas.find((c) => c.idConta === idConta);
    if (conta) {
      setContaSelec(conta);
      localStorage.setItem("contaSelec", JSON.stringify(conta));
    }
  }, [contas]);

  const limparConta = useCallback(() => {
    setContaSelec(null);
    setContas([]);
    localStorage.removeItem("contaSelec");
  }, []);

  return (
    <ContaContext.Provider
      value={{ contas, contaSelec, selecionarConta, limparConta, fetchContas, loading }}
    >
      {children}
    </ContaContext.Provider>
  );
} 