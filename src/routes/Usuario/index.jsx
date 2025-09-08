import React, { useState, useEffect } from "react";
import api from "../../services/api";
import styles from "./Usuario.module.css";

const Usuario = () => {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    idUsuario: "",
    nome: "",
    email: "",
    senha: "",
    tipo: "",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await api.get("/user/allusers");
      setItems(response.data);
      console.log(response.data);
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

    try {
      if (editingId) {
        await api.put(`/user/${editingId}`, formData);
      } else {
        await api.post("/user", formData);
      }

      resetForm();
      fetchItems();
    } catch (err) {
      console.log("Algo deu errado...", err);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      idUsuario: item.idUsuario || "",
      nome: item.nome || "",
      email: item.email || "",
      senha: item.senha || "",
      tipo: item.tipo || "",
    });
    setEditingId(item.idUsuario);
  };

  const handleDelete = async (idUsuario) => {
    try {
      await api.delete(`/ user/${idUsuario}`);
      fetchItems();
    } catch (err) {
      console.log("Algo deu errado...", err);
    }
  };

  const resetForm = () => {
    setFormData({
      idUsuario: "",
      nome: "",
      email: "",
      senha: "",
      tipo: "",
    });
    setEditingId(null);
  };

  return (
    <div>
      {/* Formulário */}
      <form onSubmit={handleSubmit} className={styles.form_container}>
        <input type="hidden" name="idMeta" value={formData.idUsuario} />

        <div className={styles.input__div}>
          <label className={styles.input__label}>Nome:</label>
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
          <label>Email:</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.input__div}>
          <label>Senha:</label>
          <input
            type="text"
            name="senha"
            value={formData.senha}
            onChange={handleInputChange}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.input__div}>
          <label>Tipo da conta:</label>
          <select 
            name="tipo"
            value={formData.tipo}
            onChange={handleInputChange}
            required
            className={styles.input}
            >
            <option value="">Selecione o tipo da conta</option>
            <option value="pessoal">Pessoal</option>
            <option value="pequena empresa">Pequena empresa</option>
          </select>
          {/* <input
            type="text"
            name="tipo"
            value={formData.tipo}
            onChange={handleInputChange}
            required
            className={styles.input}
          /> */}
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
        <h2>Usuarios Cadastrados</h2>

        {items.length === 0 ? (
          <p>Nenhum usuario cadastrado.</p>
        ) : (
          <ul>
            {items.map((item) => (
              <li key={item.idUsuario || item.email} className={styles.lista__card}>
                <div className={styles.lista__info}>
                  <h2>Nome: {item.nome}</h2>
                  <p>Email: {item.email}</p>
                  <p>Senha: {item.senha}</p>
                  <p>Tipo da conta: {item.tipo}</p>
                </div>

                <div className={styles.lista__btn}>
                  <button onClick={() => handleEdit(item)} className={styles.btn}>
                    Editar
                  </button>

                  <button
                    onClick={() => handleDelete(item.idUsuario)}
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

export default Usuario;
