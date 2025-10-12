import React, { useState, useEffect } from 'react';
import styles from "./Home.module.css";
import { useConta } from "../../context/ContaContext/useConta";
import { MovService } from '../../services/movService';
import api from '../../services/api';


const Home = () => {
  const { contaSelec } = useConta();
  const [ movs, setMovs ] = useState([]);
  const [ metas, setMetas ] = useState([]);
  const [ loadingMov, setLoadingMov ] = useState(true);
  const [ loadingMeta, setLoadingMeta ] = useState(true);

  const formatarSaldo = () => {
    if (!contaSelec || contaSelec.saldo === undefined || contaSelec.saldo === null) {
      return "R$ 0,00";
    }
    
    const saldo = parseFloat(contaSelec.saldo);
    
    if (isNaN(saldo)) {
      return "R$ 0,00";
    }
    
    return `R$ ${saldo.toFixed(2).replace('.', ',')}`;
  };

  const formatarData = (createdAt) => {
    return new Date(createdAt).toLocaleDateString('pt-BR');
  };

  const formatarValor = (valor, tipoMovimentacao) => {
    const numero = parseFloat(valor);
    const cor = tipoMovimentacao === 'credito' ? '#28a745' : '#dc3545';
    const sinal = tipoMovimentacao === 'credito' ? '+' : '-';
    
    return (
      <span style={{ color: cor, fontWeight: 'bold' }}>
        {sinal} R$ {Math.abs(numero).toFixed(2).replace('.', ',')}
      </span>
    );
  };

  useEffect(() => {
    const carregarMovimentacoes = async () => {
      if (!contaSelec?.idConta) {
        setMovs([]);
        setLoadingMov(false);
        return;
      }

      try {
        setLoadingMov(true);
        // Usando o método extrato para pegar as últimas movimentações
        const dados = await MovService.extrato(contaSelec.idConta, { 
          limit: 5 // Pega apenas 5 registros
        });
        setMovs(dados);
      } catch (err) {
        console.error('Erro ao carregar movimentações:', err);
        setMovs([]);
      } finally {
        setLoadingMov(false);
      }
    };

    const carregarMetas = async () => {
      if(!contaSelec?.idConta) {
        setMetas([]);
        setLoadingMeta(false);
        return;
      }

      setLoadingMeta(true);

      try {
        const metasRes = await api.get(`/metas/${contaSelec.idConta}`);
        const ultimas = metasRes.data.slice(-5);
        setMetas(ultimas);
      } catch (err) {
        console.log(err);
      } finally {
        setLoadingMeta(false);
      }
    }

    carregarMovimentacoes();
    carregarMetas();
  }, [contaSelec?.idConta]);

  if (loadingMeta) {
    return <p>Carregando metas...</p>;
  }

  if (loadingMov) {
    return <p>Carregando movimentações</p>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.saldo}>
        <h2 className={styles.saldo__title}>Saldo Atual</h2>
        <p className={styles.saldo__valor}>{formatarSaldo()}</p>
      </div>

      <div className={styles.content}>
        <div className={styles.mov__container}>
          <h3 className={styles.mov__title}>Últimas Movimentações</h3>
          <div className={styles.card}>
            {loadingMov ? (
              <div>Carregando...</div>
            ) : movs.length === 0 ? (
              <div>Nenhuma movimentação recente</div>
            ) : (
              <div className={styles.movimentacoes}>
                {movs.map((mov) => (
                  <div key={mov.idMov} className={styles.movimentacao}>
                    <div className={styles.info}>
                      <div className={styles.nome}>
                        {mov.nome}
                      </div>
                      <p>-</p>
                      <div className={styles.data}>
                        {formatarData(mov.createdAt)}
                      </div>
                    </div>
                    <div className={styles.valor}>
                      {formatarValor(mov.valor, mov.tipoMovimentacao)}
                    </div>
                  </div>
                ))}
              </div>
            )}
            </div>
        </div>

        <div className={styles.metas__container}>
          <h3 className={styles.metas__title}>Metas</h3>
          {metas.length === 0 ? (
            <p>Nenhuma meta cadastrada.</p>
          ) : (
            <ul className={styles.lista__metas}>
              {metas.map((item) => (
                <li key={item.idMeta || item.nome} className={styles.lista__card}>
                  <div className={styles.lista__info}>
                    <h3>Nome: {item.nome}</h3>
                    <p>Objetivo: {item.objetivo}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home;
