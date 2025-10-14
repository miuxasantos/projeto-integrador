import React, { useState, useEffect } from "react";
import styles from "./Conta.module.css";
import useAuth from "../../context/AuthContext/useAuth";
import api from "../../services/api";
import { useConta } from "../../context/ContaContext/useConta";
import useToast from "../../hooks/useToast";

const Conta = () => {
  const { usuario, token } = useAuth();
  const [formData, setFormData] = useState({
    idConta: "",
    nome: "",
    saldo: "",
    usuarios_idUsuario: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [ loading, setLoading ] = useState(false);
  const { contaSelec, selecionarConta, contas, fetchContas} = useConta();
  const { showSuccess, showError, showLoading, updateToast, dismissToast } = useToast();

  useEffect(() => {
    if (usuario?.idUsuario && token) {
      fetchContas();
    }
  }, [usuario, token, fetchContas])

  useEffect(() => {
    if (usuario?.idUsuario) {
      setFormData(prev => ({
        ...prev,
        usuarios_idUsuario: usuario.idUsuario
      }));
    }
  }, [usuario]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!usuario?.idUsuario) return;

    setLoading(true);

    const loadingToast = showLoading('Processando...');
    try {
      const prepareData = {
        ...formData,
        usuarios_idUsuario: parseInt(usuario.idUsuario),
        nome: formData.nome.trim(),
        saldo: parseFloat(formData.saldo) || 0,
      }

      if (editingId) {
        await api.put(`/conta/${editingId}`, prepareData);
      } else {
        await api.post("/conta", prepareData);
      }

      dismissToast(loadingToast);
      editingId ? showSuccess('Sucesso ao editar a conta!') : showSuccess('Sucesso ao criar sua conta');

      resetForm();
      await fetchContas();
    } catch (err) {
      console.log("Algo deu errado...", err);
      showError('Opa, parece que algo deu errado.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      idConta: item.idConta || "",
      nome: item.nome || "",
      saldo: item.saldo || "",
      usuarios_idUsuario: item.usuarios_idUsuario || usuario.idUsuario,
    });
    setEditingId(item.idConta);
  };

  const handleDelete = async (idConta) => {
    setLoading(true);

    try {
      await api.delete(`/conta/${idConta}`);
      await fetchContas();
    } catch (err) {
      console.log("Algo deu errado...", err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      idConta: "",
      nome: "",
      saldo: "",
      usuarios_idUsuario: usuario.idUsuario || "",
    });
    setEditingId(null);
  };

  return (
    <div className={styles.container}>
      
      <form onSubmit={handleSubmit} className={styles.form__container}>
        {editingId ? <p className={styles.form__title}>Editar sua conta</p> : <p className={styles.form__title}>Criar nova conta</p>}
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

        <button type="submit" className={styles.btn__conta}>
          {editingId? "Atualizar" : "Salvar"}
        </button>

        {editingId && (
          <button type="button" disabled={loading} onClick={resetForm} className={styles.btn__conta}>
            Cancelar
          </button>
        )}
      </form>

      {/* Lista de Itens */}
      <div className={styles.lista__container}>
        <div className={styles.div__h2}>
          <h2 className={styles.lista__h2}>Minhas contas</h2>
        </div>

        {contas.length === 0 ? (
          <p>Nenhuma conta cadastrada.</p>
        ) : (
          <ul className={styles.lista__ul}>
            {contas.map((item) => (
              <li key={item.idConta || item.nome} className={styles.lista__card}>
                <div className={styles.lista__info}>
                  <h3>Nome: {item.nome}</h3>
                  <p>Saldo: {item.saldo}</p>

                  <div className={styles.lista__btn}>
                    {contaSelec?.idConta === item.idConta ? (
                      <p className={styles.selecConta__p}>Conta selecionada</p>
                    ) : (
                      <button className={styles.selecConta} onClick={() => selecionarConta(item.idConta)}>Selecionar</button>
                    )}
                  </div>
                </div>

                <div className={styles.lista__btn}>
                  <button onClick={() => handleEdit(item)}
                    className={styles.btn__conta}>
                    Editar
                  </button>

                  <button
                    onClick={() => handleDelete(item.idConta)}
                    className={styles.btn__conta}
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
