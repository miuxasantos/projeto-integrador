import React, { useState, useEffect } from "react";
import styles from "./Movimentacao.module.css";
import api from "./../../services/api.js";
import { useConta } from "../../context/ContaContext/useConta";

  const Movimentacao = () => {
    const { contaSelec } = useConta();
    const [items, setItems] = useState([]);
    const [formData, setFormData] = useState({
      idMov: "",
      nome: "",
      valor: "",
      tipo: "",
      categoria: "",
      tipoMovimentacao: "",
      contas_idConta: contaSelec ? contaSelec.idConta : "",
    });
    const [editingId, setEditingId] = useState(null);

    // const api = "http://localhost:3030/mov";
    // const apiAcc= "http://localhost:3030/conta";

    useEffect(() => {
      if(contaSelec){
        fetchData();
      }
    }, [contaSelec]);

    const fetchData = async () => {
      try {
        const movResponse = await api.get(`/mov/${contaSelec.idConta}`);
        setItems(movResponse.data);
      } catch (err) {
        console.log("Algo deu errado...", err);
      }
    };

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      const prepareData = {
        ...formData,
        contas_idConta: parseInt(formData.contas_idConta),
        valor: parseFloat(formData.valor),
      }
      try {
        if (editingId) {
          await api.put(`/mov/${contaSelec.idConta}/mov/${editingId}`, prepareData);
        } else {
          await api.post(`/mov/${contaSelec.idConta}`, prepareData);
        }

        resetForm();
        fetchData();
      } catch (err) {
        console.log("Algo deu errado...", err);
      }
    };

    const handleEdit = (item) => {
      setFormData({
        idMov: item.idMov ||"",
        nome: item.nome || "",
        valor: item.valor || "",
        tipo: item.tipo || "",
        categoria: item.categoria || "",
        tipoMovimentacao: item.tipoMovimentacao || "",
        contas_idConta: parseInt(formData.contas_idConta) || contaSelec.idConta,
      });
      setEditingId(item.idMov);
    };

    const handleDelete = async (idMov) => {
      try {
        await api.delete(`/mov/${contaSelec.idConta}/mov/${idMov}`);
        fetchData();
      } catch (err) {
        console.log("Algo deu errado...", err);
      }
    };

    const resetForm = () => {
      setFormData({
        idMov: "",
        nome: "",
        valor: "",
        tipo: "",
        categoria: "",
        tipoMovimentacao: "",
        contas_idConta: parseInt(formData.contas_idConta) || contaSelec.idConta,
      });
      setEditingId(null);
    };

    if(!contaSelec) {
      return <p>Por favor, selecione sua conta.</p>
    }

    return (
      <div>
        {/* Formulário */}
        <form onSubmit={handleSubmit} className={styles.form__container}>
          <input type="hidden" name="idMeta" value={formData.idMov} />

          <div className={styles.input__div}>
            <label>Nome:</label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleInputChange}
              required
              className={styles.input}
            />
          </div>

          <div className={styles.input__div}>
            <label>Valor:</label>
            <input
              type="number"
              name="valor"
              step="0.01"
              value={formData.valor}
              onChange={handleInputChange}
              required
              className={styles.input}
            />
          </div>

          <div className={styles.input__div}>
            <label>Tipo:</label>
            <input
              type="tipo"
              name="tipo"
              value={formData.tipo}
              onChange={handleInputChange}
              required
              className={styles.input}
            />
          </div>

          <div className={styles.input__div}>
            <label>Tipo da Movimentação:</label>
            <input
              type="text"
              name="tipoMovimentacao"
              value={formData.tipoMovimentacao}
              onChange={handleInputChange}
              required
              className={styles.input}
            />
          </div>

          <div className={styles.input__div}>
            <label>Categoria:</label>
            <input
              type="text"
              name="categoria"
              value={formData.categoria}
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

          <button type="submit" className={styles.btn}>
            {editingId ? "Atualizar" : "Salvar"}
          </button>

          {editingId && (
            <button type="button" onClick={resetForm} className={styles.btn}>
              Cancelar
            </button>
          )}
        </form>

        {/* Lista de Itens */}
        <div className={styles.lista__container}>
          <h2>Movimentações Cadastradas {contaSelec.nome}</h2>

          {items.length === 0 ? (
            <p>Nenhuma movimentação cadastrada.</p>
          ) : (
            <ul>
              {items.map((item) => (
                <li key={item.idMov || item.nome} className={styles.lista__card}>
                  <div className={styles.lista__info}>
                    <h3>Nome: {item.nome}</h3>
                    <p>Valor: {item.valor}</p>
                    <p>Tipo: {item.tipo}</p>
                    <p>Tipo de Movimentação: {item.tipoMovimentacao}</p>
                    <p>Categoria: {item.categoria}</p>
                    <p>Id da conta: {item.contas_idConta}</p>
                  </div>

                  <div className={styles.lista__btn}>
                    <button onClick={() => handleEdit(item)} className={styles.btn}>
                      Editar
                    </button>

                    <button
                      onClick={() => handleDelete(item.idMov)}
                      className={styles.btn}
                    >
                      Excluir
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  };

  export default Movimentacao;
