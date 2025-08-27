import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useOutletContext } from "react-router-dom";
import styles from "./Auth.module.css";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    tipo: "",
  });

  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { onLoginSuccess } = useOutletContext();

  const API_URL = "http://localhost:3030/auth";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const endpoint = isLogin ? "/signin" : "/signup";
      const response = await axios.post(`${API_URL}${endpoint}`, formData);

      if (response.data.token) {
        onLoginSuccess({
          ...response.data.token,
          token: response.data.token,
        });
        navigate("/");
      }
    } catch (error) {
      setError(error.response?.data?.error || "Erro ao processar solicitação.");
    }
  };

  return (
    <div className={styles.auth_container}>
      <div className={styles.auth_card}>
        <h2>{isLogin ? "Login" : "Cadastro"}</h2>
        {error && <div className={styles.error}>error</div>}

        <form onSubmit={handleSubmit} className={styles.auth_form}>
          {!isLogin && (
            <>
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
              </div>
            </>
          )}

          {isLogin && (
          <>
          <div className={styles.auth_login}>
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

            <div className={styles.auth_login}>
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
          </>)}

          <button type="submit" className={styles.auth__button}>{isLogin ? "Acessar" : "Cadastrar"}</button>
        </form>

        <p className={styles.auth_mode}>
            {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}
            <span onClick={() => setIsLogin(!isLogin)}
                className={styles.auth_link}
            >
                {isLogin ? 'Cadastrar' : 'Entrar'}
            </span>
        </p>
      </div>
    </div>
  );
};

export default Auth;