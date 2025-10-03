import React, { useState, useEffect, useCallback } from "react";
import styles from "./Metas.module.css";
import { useConta } from "../../context/ContaContext/useConta";
import api from "../../services/api.js";

const Metas = () => {
  const { contaSelec } = useConta();
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    idMeta: "",
    nome: "",
    objetivo: "",
    quantia: "",
    progresso: "",
    //contas_idConta: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [ loading, setLoading ] = useState(true);

  const fetchData = useCallback(async () => {
    if(!contaSelec?.idConta) {
      setItems([]);
      setLoading(false);
      return;
    }
    
    setLoading(true);

    try {
      const movResponse = await api.get(`/metas/${contaSelec.idConta}`);
      setItems(movResponse.data);
    } catch (err) {
      console.log("Algo deu errado...", err);
    } finally {
      setLoading(false);
    }
  }, [contaSelec?.idConta]);

  useEffect(() => {
      fetchData();
  }, [fetchData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!contaSelec?.idConta) {
      console.log("Nenhuma conta selecionada");
      return;
    }

    setLoading(true);

    try {

      const prepareData = {
        ...formData,
        //contas_idConta: parseInt(formData.contaSelec.idConta),
        progresso: parseInt(formData.progresso),
        quantia: parseFloat(formData.quantia),
      }

      if (editingId) {
        await api.put(`/metas/${contaSelec.idConta}/metas/${editingId}`, prepareData);
      } else {
        await api.post(`/metas/${contaSelec.idConta}`, prepareData);
      }

      resetForm();
      await fetchData();
    } catch (err) {
      console.log("Algo deu errado...", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      idMeta: item.idMeta ||"",
      nome: item.nome || "",
      objetivo: item.objetivo || "",
      quantia: item.quantia || "",
      progresso: item.progresso || "",
      //contas_idConta: parseInt(formData.contas_idConta) || contaSelec?.idConta || "",
    });
    setEditingId(item.idMeta);
  };

  const handleDelete = async (idMeta) => {
    setLoading(true);
    try {
      await api.delete(`/metas/${contaSelec.idConta}/metas/${idMeta}`);
      await fetchData();
    } catch (err) {
      console.log("Algo deu errado...", err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      idMeta: "",
      nome: "",
      objetivo: "",
      quantia: "",
      progresso: "",
      contas_idConta: parseInt(formData.contas_idConta) || contaSelec?.idConta,
    });
    setEditingId(null);
  };

  if(!contaSelec) {
      return <p>Por favor, selecione sua conta.</p>
  }

  if (loading && items.length === 0) {
    return <p>Carregando metas...</p>;
  }

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

{/*Alterar para ficar automático! */}
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

        <button type="submit" disabled={loading} className={styles.btn}>
          {loading ? "Salvando..." : (editingId ? "Atualizar" : "Salvar")}
        </button>

        {editingId && (
          <button type="button" onClick={resetForm} disabled={loading} className={styles.btn}>
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
                  <p>Progresso: {item.progresso}</p>
                  <p>Id da conta: {item.contas_idConta}</p>
                </div>

                <div className={styles.lista__btn}>
                  <button onClick={() => handleEdit(item)}
                    disabled={loading} 
                    className={styles.btn}>
                    Editar
                  </button>

                  <button
                    onClick={() => handleDelete(item.idMeta)}
                    disabled={loading}
                    className={styles.btn}>
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
