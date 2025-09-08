import React, { useState, useEffect } from "react";
import styles from "./Conta.module.css";
import useAuth from "../../context/AuthContext/useAuth";
import api from "../../services/api";
import { useConta } from "../../context/ContaContext/useConta";

const Conta = () => {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    idConta: "",
    nome: "",
    saldo: "",
    usuarios_idUsuario: user?.idUsuario || "",
  });
  const [editingId, setEditingId] = useState(null);
  const [ loading, setLoading ] = useState(true);
  const { contas, contaSelec, selecionarConta } = useConta();

  useEffect(() => {
    fetchData();
  }, [user]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [contaResponse] = await Promise.all([
        api.get("/conta/"),
        //api.get(`user/${user.idUsuario}`),
      ]);
      setItems(contaResponse.data);
    } catch (err) {
      console.log("Algo deu errado...", err);
    } finally {
      setLoading(false);
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

    try {
      const prepareData = {
        ...formData,
        // usuarios_idUsuario: parseInt(user.idUsuario),
        nome: formData.nome,
        saldo: parseFloat(formData.saldo),
      }

    
      if (editingId) {
        await api.put(`/conta/${editingId}`, prepareData);
      } else {
        await api.post("/conta", prepareData);
      }

      resetForm();
      fetchData();
    } catch (err) {
      console.log("Algo deu errado...", err);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      idConta: item.idConta || "",
      nome: item.nome || "",
      saldo: item.saldo || "",
      usuarios_idUsuario: item.usuarios_idUsuario || user.idUsuario,
    });
    setEditingId(item.idConta);
  };

  const handleDelete = async (idConta) => {
    try {
      await api.delete(`/conta/${idConta}`);
      fetchData();
    } catch (err) {
      console.log("Algo deu errado...", err);
    }
  };

  const resetForm = () => {
    setFormData({
      idConta: "",
      nome: "",
      saldo: "",
      usuarios_idUsuario: user.idUsuario || "",
    });
    setEditingId(null);
  };

  if(loading) {
    return <p>Carregando</p>;
  }

  return (
    <div>
      
      <form onSubmit={handleSubmit} className={styles.form__container}>
        <input type="hidden" name="idConta" value={formData.idConta} />

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
          <label>Saldo:</label>
          <input
            type="number"
            name="saldo"
            step="0.01"
            value={formData.saldo}
            onChange={handleInputChange}
            required
            className={styles.input}
          />
        </div>

        {/* <div className={styles.input__div}>
          <label>Usuario:</label>
            name="usuarios_idUsuario"
            value={formData.usuarios_idUsuario}
            onChange={handleInputChange}
            required
            className={styles.input}
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
        <h2>Contas Cadastradas</h2>

        {items.length === 0 ? (
          <p>Nenhuma conta cadastrada.</p>
        ) : (
          <ul>
            {items.map((item) => (
              <li key={item.idConta || item.nome} className={styles.lista__card}>
                <div className={styles.lista__info}>
                  <h3>Nome: {item.nome}</h3>
                  <p>Saldo: {item.saldo}</p>
                  <p>Id do usuário: {item.usuarios_idUsuario}</p>

                  {contaSelec?.idConta === item.idConta ? (
                    <p><strong>Conta selecionada</strong></p>
                  ) : (
                    <button onClick={() => selecionarConta(item.idConta)}>Selecionar</button>
                  )}
                </div>

                <div className={styles.lista__btn}>
                  <button onClick={() => handleEdit(item)} className={styles.btn}>
                    Editar
                  </button>

                  <button
                    onClick={() => handleDelete(item.idConta)}
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

export default Conta;
