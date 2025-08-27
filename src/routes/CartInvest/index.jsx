import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./CartInvest.module.css";

const CartInvest = () => {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    idCartInvest: "",
    valor: "",
    data: "",
    contas_idConta: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [contas, setContas] = useState([]);

  const api = "http://localhost:3030/invest";
  const apiAcc= "http://localhost:3030/conta";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [cartInvestResponse, contaResponse] = await Promise.all([
        axios.get(`${api}/allinvest`),
        axios.get(`${apiAcc}/allacc`),
      ]);
      setItems(cartInvestResponse.data);
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
      valor: parseFloat(formData.valor),
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
      idCartInvest: item.idMeta ||"",
      valor: item.valor || "",
      contas_idConta: item.contas_idConta || "",
    });
    setEditingId(item.idCartInvest);
  };

  const handleDelete = async (idCartInvest) => {
    try {
      await axios.delete(`${api}/${idCartInvest}`);
      fetchData();
    } catch (err) {
      console.log("Algo deu errado...", err);
    }
  };

  const resetForm = () => {
    setFormData({
      idCartInvest: "",
      valor: "",
      contas_idConta: "",
    });
    setEditingId(null);
  };

  return (
    <div>
      {/* Formulário */}
      <form onSubmit={handleSubmit} className={styles.form__container}>
        <input type="hidden" name="idCartInvest" value={formData.idCartInvest} />

        <div className={styles.input__div}>
          <label>valor:</label>
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
        <h2>Investimentos Cadastrados</h2>

        {items.length === 0 ? (
          <p>Nenhuma conta cadastrada.</p>
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default CartInvest;
