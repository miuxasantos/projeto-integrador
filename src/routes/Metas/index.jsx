import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Metas.module.css";

const Metas = () => {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    idMeta: "",
    nome: "",
    objetivo: "",
    quantia: "",
    progresso: "",
    contas_idConta: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [contas, setContas] = useState([]);

  const api = "http://localhost:3030/metas";
  const apiAcc= "http://localhost:3030/conta";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [metasResponse, contaResponse] = await Promise.all([
        axios.get(`${api}/allgoals`),
        axios.get(`${apiAcc}/allacc`),
      ]);
      setItems(metasResponse.data);
      setContas(contaResponse.data);
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
      progresso: parseInt(formData.progresso),
      quantia: parseFloat(formData.quantia),
    }
    console.log(prepareData)
    try {
      if (editingId) {
        await axios.put(`${api}/${editingId}`, prepareData);
      } else {
        await axios.post(`${api}`, prepareData);
      }

      resetForm();
      fetchData();
    } catch (err) {
      console.log("Algo deu errado...", err);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      idMeta: item.idMeta ||"",
      nome: item.nome || "",
      objetivo: item.objetivo || "",
      quantia: item.quantia || "",
      progresso: item.progresso || "",
      contas_idConta: item.contas_idConta || "",
    });
    setEditingId(item.idMeta);
  };

  const handleDelete = async (idMeta) => {
    try {
      await axios.delete(`${api}/${idMeta}`);
      fetchData();
    } catch (err) {
      console.log("Algo deu errado...", err);
    }
  };

  const resetForm = () => {
    setFormData({
      idMeta: "",
      nome: "",
      objetivo: "",
      quantia: "",
      progresso: "",
      contas_idConta: "",
    });
    setEditingId(null);
  };

  return (
    <div>

      {/* Formulário */}
      <form onSubmit={handleSubmit} className={styles.form__container}>
        <input type="hidden" name="idMeta" value={formData.idMeta} />

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
          <label>Objetivo:</label>
          <input
            type="text"
            name="objetivo"
            value={formData.objetivo}
            onChange={handleInputChange}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.input__div}>
          <label>quantia:</label>
          <input
            type="number"
            name="quantia"
            step="0.01"
            value={formData.quantia}
            onChange={handleInputChange}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.input__div}>
          <label>progresso:</label>
          <input
            type="number"
            name="progresso"
            value={formData.progresso}
            onChange={handleInputChange}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.input__div}>
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
        </div>

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
        <h2>Metas Cadastradas</h2>

        {items.length === 0 ? (
          <p>Nenhuma conta cadastrada.</p>
        ) : (
          <ul>
            {items.map((item) => (
              <li key={item.idMeta || item.nome} className={styles.lista__card}>
                <div className={styles.lista__info}>
                  <h3>Nome: {item.nome}</h3>
                  <p>Objetivo: {item.objetivo}</p>
                  <p>Quantia: {item.quantia}</p>
                  <p>Progresso: {item.progresso}%</p>
                  <p>Id da conta: {item.contas_idConta}</p>
                </div>

                <div className={styles.lista__btn}>
                  <button onClick={() => handleEdit(item)} className={styles.btn}>
                    Editar
                  </button>

                  <button
                    onClick={() => handleDelete(item.idMeta)}
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

export default Metas;
