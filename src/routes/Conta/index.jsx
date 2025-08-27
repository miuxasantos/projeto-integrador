import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Conta.module.css";

const Conta = () => {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    idConta: "",
    nome: "",
    saldo: "",
    usuarios_idUsuario: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [usuarios, setUsuarios] = useState([]);

  const api = "http://localhost:3030/conta";
  const apiUser = "http://localhost:3030/user";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [contaResponse, usuarioResponse] = await Promise.all([
        axios.get(`${api}/allacc`),
        axios.get(`${apiUser}/allusers`),
      ]);
      setItems(contaResponse.data);
      setUsuarios(usuarioResponse.data);
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
      usuarios_idUsuario: parseInt(formData.usuarios_idUsuario),
      saldo: parseFloat(formData.saldo),
    }

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
      idConta: item.idConta || "",
      nome: item.nome || "",
      saldo: item.saldo || "",
      usuarios_idUsuario: item.usuarios_idUsuario || ""
    });
    setEditingId(item.idConta);
  };

  const handleDelete = async (idConta) => {
    try {
      await axios.delete(`${api}/${idConta}`);
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
      usuarios_idUsuario: "",
    });
    setEditingId(null);
  };

  return (
    <div>
      
      <form onSubmit={handleSubmit} className={styles.form__container}>
        <input type="hidden" name="idMeta" value={formData.idConta} />

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

        <div className={styles.input__div}>
          <label>Usuario:</label>
          <select
            name="usuarios_idUsuario"
            value={formData.usuarios_idUsuario}
            onChange={handleInputChange}
            required
            className={styles.input}
          >
            <option value="">Selecione um usuário</option>
            {usuarios.map((usuario) => (
              <option key={usuario.idUsuario} value={usuario.idUsuario}>
                {usuario.nome}
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
