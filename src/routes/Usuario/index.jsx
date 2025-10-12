import React, { useState, useEffect, useCallback } from "react";
import api from "../../services/api";
import styles from "./Usuario.module.css";

const Usuario = () => {
  const [items, setItems] = useState(null);
  const [formData, setFormData] = useState({
    idUsuario: "",
    nome: "",
    email: "",
    senha: "",
    tipo: "",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    console.log("🎯 editingId ATUALIZADO:", editingId);
  }, [editingId]);

  const fetchItems = useCallback(async () => {
    try {
      const response = await api.get("/user/me");
      setItems(response.data);
      console.log(response.data);
      console.log(items)
    } catch (err) {
      console.log("Algo deu errado...", err);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

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
      const dataSend = {
        ... formData,
        idUsuario: editingId,
      }

      if (editingId) {
        await api.put(`/user/${editingId}`, dataSend);
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
      senha: "",
      tipo: item.tipo || "",
    });

    const newEditingId = item.idUsuario;
    setEditingId(newEditingId);
    console.log(editingId);
  };

  const handleDelete = async (idUsuario) => {
    try {
      await api.delete(`/user/${idUsuario}`);
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
    <div className={styles.usuario_container}>

      {/* Lista de Itens */}
      <div className={styles.lista__container}>
        <h2>Meu perfil</h2>

          <ul>
            {items ?(
              <li key={items.idUsuario || items.email} className={styles.lista__card}>
                <div className={styles.lista__info}>
                  <h2>Nome: {items.nome}</h2>
                  <p>Email: {items.email}</p>
                  {/*<p>Senha: {item.senha}</p>*/}
                  <p>Tipo da conta: {items.tipo}</p>
                </div>

              {editingId ? (

                <div className={styles.lista__btn}>
                  <button onClick={() => handleEdit(items)} hidden="true" className={styles.btn}>
                    Editar
                  </button>

                  <button
                    onClick={() => handleDelete(items.idUsuario)} hidden="true"
                    className={styles.btn}
                  >
                    Excluir
                  </button>
                </div>

              ) : (<div className={styles.lista__btn}>
                  <button onClick={() => handleEdit(items)} className={styles.btn}>
                    Editar
                  </button>

                  <button
                    onClick={() => handleDelete(items.idUsuario)}
                    className={styles.btn}
                  >
                    Excluir
                  </button>
                </div>)}
              </li>
            ) : ("")}
          </ul>
      </div>

      {/* Formulário */}
      <form onSubmit={handleSubmit} className={styles.form_container}>
      {editingId ? (
        <>
        <input type="hidden" name="idUsuario" value={formData.idUsuario} />

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
            type="password"
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
        </div>

        <button type="submit" className={styles.btn}>
          Atualizar
        </button>
        </>
        ) : (<button type="submit" hidden="true" className={styles.btn}>
          Atualizar
        </button>)}

        {editingId && (
          <button type="button" onClick={resetForm} className={styles.btn}>
            Cancelar
          </button>
        )}
      </form>
    </div>
  );
};

export default Usuario;
