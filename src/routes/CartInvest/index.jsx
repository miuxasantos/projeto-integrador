import React, { useState, useEffect, useCallback } from "react";
import styles from "./CartInvest.module.css";
import api from "../../services/api.js";
import { useConta } from "../../context/ContaContext/useConta.jsx";

const CartInvest = () => {
  const { contaSelec } = useConta();
  const [investimento, setInvestimento] = useState(null);
  const [formData, setFormData] = useState({
    idCartInvest: "",
    valor: "",
    contas_idConta: "",
  });

  const fetchData = useCallback( async () => {
    try {
      const investResponse = await api.get(`/invest/${contaSelec.idConta}`);

      if (Array.isArray(investResponse.data) && investResponse.data.length > 0) {
        setInvestimento(investResponse.data[0]);
      } else if (investResponse.data && typeof investResponse.data === 'object') {
        setInvestimento(investResponse.data);
      } else {
        setInvestimento(null);
      }
    } catch (error) {
      console.log("Algo deu errado...", error);
    }
  }, [contaSelec]);

  useEffect(() => {
    if(contaSelec) {
      fetchData();
    }
  }, [contaSelec, fetchData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value || "",
    });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const prepareData = {
  //     ...formData,
  //     contas_idConta: parseInt(formData.contas_idConta),
  //     valor: parseFloat(formData.valor),
  //   }
  //   console.log(prepareData)
  //   try {
  //     if (editingId) {
  //       await api.put(`/invest/${contaSelec.idConta}/invest/${editingId}`, prepareData);
  //     } else {
  //       await api.post(`/invest/${contaSelec.idConta}`, prepareData);
  //     }

  //     resetForm();
  //     fetchData();
  //   } catch (err) {
  //     console.log("Algo deu errado...", err);
  //   }
  // };

  // const handleEdit = (item) => {
  //   setFormData({
  //     idCartInvest: item.idMeta ||"",
  //     valor: item.valor || "",
  //     contas_idConta: parseInt(formData.contas_idConta) || contaSelec.idConta,
  //   });
  //   setEditingId(item.idCartInvest);
  // };

  const handleRetirada = async (e) => {
    e.preventDefault();

    if(!formData.valor || parseFloat(formData.valor) <= 0) {
      alert("Opa! Digite um valor válido!");
    }

    if (!investimento) {
      alert("Não há investimento para retirar");
      return;
    }

    if (!investimento || !investimento.idCartInvest || investimento.valor === undefined) {
      alert("Não há investimento para retirar");
      return;
    }

    const valorRetirada = parseFloat(formData.valor);
    const saldoAtual = parseFloat(investimento.valor) || 0;
    
    if (valorRetirada > saldoAtual) {
      alert(`Saldo insuficiente! Você tem R$ ${saldoAtual.toFixed(2)}`);
      return;
    }

    try {
      await api.post(`/invest/${contaSelec.idConta}/invest/${investimento.idCartInvest}/retirar`, {
        valor: valorRetirada
      });

      resetForm();
      fetchData();
    } catch (error) {
      console.log("Opa, algo deu errado ao retirar.", error);
      console.log({ status: error.response?.status,
      data: error.response?.data, // ← ESTA É A INFORMAÇÃO IMPORTANTE!
      message: error.message,
      url: error.config?.url})
    }
  }

  // const handleDelete = async (idCartInvest) => {
  //   try {
  //     await api.delete(`/invest/${contaSelec.idConta}/${idCartInvest}`);
  //     fetchData();
  //   } catch (err) {
  //     console.log("Algo deu errado...", err);
  //   }
  // };

  const resetForm = () => {
    setFormData({
      idCartInvest: "",
      valor: "",
      contas_idConta: parseInt(formData.contas_idConta) || contaSelec.idConta,
    });
  };

  if(!contaSelec) {
    return <p>Por favor, selecione a sua conta.</p>
  }

  return (
    <div>
      {/* Formulário */}
      <form className={styles.form__container}>
        <input type="hidden" name="idCartInvest" value={formData.idCartInvest} />

        <div className={styles.input__div}>
          <label>Valor:</label>
          <input
            type="number"
            name="valor"
            step="0.01"
            min="0.01"
            value={formData.valor}
            onChange={handleInputChange}
            required
            className={styles.input}
          />
        </div>

        {/* <div className={styles.input__div}>
          <label>conta:</label>
          <select
            name="contas_idConta"
            value={formData.contas_idConta}
            onChange={handleInputChange}
            required
            className={styles.input}
          >
            <option value="">Selecione uma conta</option>
            {contas.map((conta) => (
              <option key={conta.idConta} value={conta.idConta}>
                {conta.nome}
              </option>
            ))}
          </select>
        </div> */}

        {investimento && (
          <button 
            type="button" 
            onClick={handleRetirada} 
            className={`${styles.btn} ${styles.btn__retirar}`}
            disabled={!formData.valor || parseFloat(formData.valor) <= 0}
          >
            Retirar
          </button>
        )}

      </form>

      {/* Lista de Itens */}
      <div className={styles.lista__container}>
        <h2>Porquinho Cents</h2>

        {!investimento ? (
          <div>
            <p>Nenhum investimento cadastrado para esta conta.</p>
          </div>
        ) : (
          <div>
            <h3>R$ {parseFloat(investimento.valor).toFixed(2)}</h3>
          </div>
        )}

        {/* {Array.isArray(items) && items.length === 0 ? (
          <p>Nenhuma investimento cadastrado.</p>
        ) : (
          Array.isArray(items) && (
          <ul>
            {items.map((item) => (
              <li key={item.idCartInvest || item.valor} className={styles.lista__card}>
                <div className={styles.lista__info}>
                  <h3>Valor: {item.valor}</h3>
                  <p>Data: {item.data}</p>
                  <p>Id da conta: {item.contas_idConta}</p>
                </div>

                <div className={styles.lista__btn}>
                  <button onClick={() => handleEdit(item)} className={styles.btn}>
                    Editar
                  </button>

                  <button
                    onClick={() => handleDelete(item.idCartInvest)}
                    className={styles.btn}
                  >
                    Excluir
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ))} */}
      </div>
    </div>
  );
};

export default CartInvest;
