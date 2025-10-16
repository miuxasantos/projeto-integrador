import React, { useState, useEffect, useCallback } from "react";
import styles from "./Movimentacao.module.css";
import api from "./../../services/api.js";
import { useConta } from "../../context/ContaContext/useConta";
import useToast from "../../hooks/useToast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePen, faTrash } from "@fortawesome/free-solid-svg-icons";

const Dashboard = React.lazy(() => import('../../Componentes/Dashboard'));

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
      //contas_idConta: "",
    });
    const [editingId, setEditingId] = useState(null);
    const [ loading, setLoading ] = useState(true);
    const { showSuccess, showError, showLoading, updateToast, dismissToast } = useToast();

    const fetchData = useCallback(async () => {
      if (!contaSelec?.idConta) return;
      setLoading(true);
      
      const loadingT = showLoading('Buscando seus dados...');
      try {
        const movResponse = await api.get(`/mov/${contaSelec.idConta}`);
        setItems(movResponse.data);
      } catch (err) {
        console.log("Algo deu errado...", err);
      } finally {
        setLoading(false);
        dismissToast(loadingT);
      }
    }, [contaSelec?.idConta]);

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };

    useEffect(() => {
      if (contaSelec) {
        fetchData();
      } else {
        setItems([]);
      }
    }, [contaSelec, fetchData]);

    const handleSubmit = async (e) => {
      e.preventDefault();

      if (!contaSelec?.idConta) {
        console.log("Nenhuma conta selecionada");
        return;
      }

      setLoading(true);
      
      const loadingToast = editingId ? showLoading('Editando sua movimentação...') : showLoading('Criando sua movimentação...');
      try {
        const prepareData = {
          nome: formData.nome.trim(),
          valor: parseFloat(formData.valor) || 0,
          tipo: formData.tipo,
          categoria: formData.categoria,
          tipoMovimentacao: formData.tipoMovimentacao,
        }

        if (editingId) {
          await api.put(`/mov/${contaSelec.idConta}/mov/${editingId}`, prepareData);
        } else {
          console.log(prepareData);
          await api.post(`/mov/${contaSelec.idConta}`, prepareData);
        }

        dismissToast(loadingToast);
        editingId ? showSuccess('Sucesso ao editar a sua movimentação!') : showSuccess('Sucesso ao criar sua movimentação!');
        resetForm();
        await fetchData();
      } catch (err) {
        console.error("Erro detalhado:", {
          message: err.message,
          status: err.response?.status,
          data: err.response?.data,
          url: err.config?.url
        });

        showError('Opa, algo deu errado!');

      } finally {
        setLoading(false);
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
        //contas_idConta: parseInt(formData.contas_idConta) || contaSelec?.idConta || "",
      });
      setEditingId(item.idMov);
    };

    const handleDelete = async (idMov) => {
      if (!contaSelec?.idConta) return;

      setLoading(true);

      try {
        await api.delete(`/mov/${contaSelec.idConta}/mov/${idMov}`);
        await fetchData();
      } catch (err) {
        console.log("Algo deu errado...", err);
      } finally {
        setLoading(false);
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
        // contas_idConta: contaSelec?.idConta || "",
      });
      setEditingId(null);
    };

    if(!contaSelec) {
      return <p>Por favor, selecione sua conta.</p>
    }

    if (loading && items.length === 0) {
        return <p>Carregando mov...</p>;
    }

    return (
      <div className={styles.container_mov}>
        {/* Formulário */}
        <div className={styles.container__mov__div}>
          <form onSubmit={handleSubmit} className={styles.form__container}>
            <input type="hidden" name="idMov" value={formData.idMov} />

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
              <select
                type="text"
                name="tipo"
                value={formData.tipo}
                onChange={handleInputChange}
                required
                className={styles.input}>
                <option value="">Selecione a espécie de gasto</option>
                <option value="variavel">Variável</option>
                <option value="fixa">Fixa</option>
                <option value="superfluo">Superflúo</option>
                <option value="essencial">Essencial</option>
              </select>
            </div>

            <div className={styles.input__div}>
              <label>Modo da Movimentação:</label>
              <select
                type="text"
                name="tipoMovimentacao"
                value={formData.tipoMovimentacao}
                onChange={handleInputChange}
                required
                className={styles.input}>
                <option value="">Selecione o tipo da movimentação</option>
                <option value="credito">Crédito na conta</option>
                <option value="debito">Débito na conta</option>
              </select>
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

            <button type="submit" disabled={loading} className={styles.btn_mov}>
              {loading? "Salvando..." : (editingId ? "Atualizar" : "Salvar")}
            </button>

            {editingId && (
              <button type="button" disabled={loading} onClick={resetForm} className={styles.btn_mov}>
                Cancelar
              </button>
            )}
          </form>
          
          {/* Lista de Itens */}
          <div className={styles.lista__container}>
            <h2 className={styles.lista__container__h2}>Movimentações Cadastradas da Conta: {contaSelec.nome}</h2>

            {items.length === 0 ? (
              <p>Nenhuma movimentação cadastrada.</p>
            ) : (
              <ul className={styles.lista_mov}>
                {items.map((item) => (
                  <li key={item.idMov || item.nome} className={styles.lista__card}>
                    <div className={styles.lista__info}>
                      <h3>Nome: {item.nome}</h3>
                      <p style={{color: (item.tipoMovimentacao === "credito") ? 'green' : 'red',}}>Valor: {item.valor}</p>
                      <p>Tipo: {item.tipo}</p>
                      <p>Tipo de Movimentação: {item.tipoMovimentacao}</p>
                      <p>Categoria: {item.categoria}</p>
                    </div>

                    <div className={styles.lista__btn}>
                      <button onClick={() => handleEdit(item)} className={styles.btn_mov}>
                        <FontAwesomeIcon icon={faFilePen} size="lg" style={{color: "#4a4ecf"}} />
                      </button>

                      <button
                        onClick={() => handleDelete(item.idMov)}
                        className={styles.btn_mov}
                      >
                        <FontAwesomeIcon icon={faTrash} size="lg" style={{color: "#d41002"}} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <React.Suspense fallback={<div><p>Carregando Dashboard...</p></div>}>
          <Dashboard className={styles.dashboard} contaSelec={contaSelec} />
        </React.Suspense>

      </div>
    );
  };

  export default Movimentacao;
