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
    <div className={styles.invest__container}>
      {/* Formulário */}

      <div className={styles.container__porquinho}>
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

        {investimento && (
          <button 
            type="button" 
            onClick={handleRetirada} 
            className={styles.btn}
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
          <div className={styles.lista__card}>
            <img src="https://i.pinimg.com/736x/ec/44/a7/ec44a7c9e2ddbc9eebee4e4ac0608020.jpg"
              className={styles.img__invest} />
            <h3>R$ {parseFloat(investimento.valor).toFixed(2)}</h3>
          </div>
        )}
        </div>
      </div>

      <div className={styles.dicas}>
        <h2 className={styles.dicas__h2}>Sugestões</h2>

        <ul className={styles.dicas__lista}>
          <li className={styles.dicas__card}>
            <h3 className={styles.dicas__title}>Tesouro Direto</h3>
              <p className={styles.dicas__info}>
                Tesouro direto é a plataforma do governo federal para vender títulos públicos a pessoas físicas. 
                Ou seja, você empresta dinheiro para o governo. É considerado o investimento mais seguro do país, 
                pois quem garante o pagamento é o Tesouro Nacional.
              </p>
          </li>

          <li className={styles.dicas__card}>
            <h3 className={styles.dicas__title}>Tesouro Prefixado</h3>
            <p className={styles.dicas__info}>
              No Tesouro prefixado você sabe exatamente qual a taxa de juros (rentabilidade) no momento da compra.
              Exemplo: Você compra um título que vai pagar 10% ao ano. 
              Não importa se a economia melhora ou piora, no vencimento, você receberá os 10% ao ano.
            </p>
          </li>

          <li className={styles.dicas__card}>
            <h3 className={styles.dicas__title}>Tesouro Selic</h3>
            <p className={styles.dicas__info}>
              No Tesouro Selic, a rentabilidade varia de acordo com a taxa básica de juros da economia, a Selic. 
              Se a Selic sobe, o título rende mais. Se cai, rende menos.
              É como uma caderneta de poupança superpotente. 
              É o título mais líquido (fácil de resgatar) do Tesouro e é muito usado para reserva de emergência.
            </p>
          </li>

          <li className={styles.dicas__card}>
            <h3 className={styles.dicas__title}>CDB</h3>
            <p className={styles.dicas__info}>
              O Certificado de Depósito Bancário (CDB), funciona como se você estivesse emprestando dinheiro para um banco. Em troca, o banco te paga juros.
              A rentabilidade geralmente está vinculada a um índice, como o CDI (que é "primo" da Selic). Um CDB bom paga "100% do CDI" ou mais.
            </p>
          </li>

          <li className={styles.dicas__card}>
            <h3 className={styles.dicas__title}>LCI e LCA</h3>
            <p className={styles.dicas__info}>
              Letra de Crédito Imobiliário e Letra de Crédito Agronegócio.
              São bem parecidos com o CDB, mas, em vez de emprestar para o banco de forma geral, o dinheiro é destinado a um setor específico: o Imobiliário (LCI) ou o Agronegócio (LCA).
              Sua grande vantagem é que eles são isentos de Imposto de Renda para pessoas físicas. Por isso, costumam ser muito atraentes.
              E também são protegidos pelo FGC, assim como o CDB.
            </p>
          </li>

          <li className={styles.dicas__card}>
            <h3 className={styles.dicas__title}>Fundos de Investimento</h3>
            <p className={styles.dicas__info}>
              Aqui a coisa muda um pouco. Em vez de você comprar um título diretamente, você está comprando uma cota de um "condomínio" de investidores.
              Como funciona: Um gestor profissional pega o dinheiro de todos os cotistas e aplica em uma cesta de investimentos (que pode conter Tesouro Direto, CDB, Ações, etc.), de acordo com o objetivo do fundo.

              Exemplos:
              Fundo de Renda Fixa: Aplica majoritariamente em títulos de renda fixa (CDB, LCI, Tesouro).
              Fundo Multimercado: Aplica em várias coisas ao mesmo tempo (renda fixa, ações, moedas, derivativos).
              Fundo de Ações: Aplica majoritariamente em ações na bolsa de valores.
              Fundo DI (ou Referenciado DI): Espelho o desempenho da Selic. Muito conservador, similar ao Tesouro Selic.
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CartInvest;
