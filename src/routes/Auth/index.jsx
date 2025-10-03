import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import styles from "./Auth.module.css";
import api from "../../services/api";
import useAuth from "../../context/AuthContext/useAuth";

const Auth = ({ mode = "signin" }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    tipo: "",
  });

  const [error, setError] = useState("");
  const [ loading, setLoading ] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    const path = location.pathname;
    
    if(path === ("/auth/signup")){
      setIsLogin(false)
    } else if (path === "/auth/signin" || path === "/auth"){
      setIsLogin(true);
    }

  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname === "/auth") {
      navigate("/auth/signin", { replace: true });
    }
  }, [location.pathname, navigate]);

  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  useEffect(() => {
    setIsLogin(mode === "signin");

    setFormData({
      nome: "",
      email: "",
      senha: "",
      tipo: "",
    });

  }, [mode]);

  const switchMode = () => {
    const newMode = isLogin ? "signup" : "signin";
    navigate(`/auth/${newMode}`);
  };

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

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
    setLoading(true);

    try {
      const endpoint = isLogin ? "auth/signin" : "auth/signup";
      const dataToSend = isLogin 
        ? { email: formData.email, senha: formData.senha }
        : formData;

      const response = await api.post(endpoint, dataToSend);

      console.log("Resposta completa do servidor:", response.data);
      console.log("Token recebido:", response.data.token);
      console.log("Dados do usuário recebidos:", response.data.usuario || response.data.user);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("usuario", JSON.stringify(response.data.usuario || response.data.user));

      if (response.data.token) {
        await login({ usuario: response.data.usuario || response.data.user, token: response.data.token });
        
        setTimeout(() => {
          navigate("/");
        }, 100);
      }
    } catch (error) {
      setError(error.response?.data?.error || "Erro ao processar solicitação.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.auth_container}>
      <div className={styles.auth_card}>
        <h2 className={styles.greetings_h2}>{isLogin ? "Bem-vindo de volta!" : "Bem-vindo!"}</h2>
        {error && <div className={styles.error}>{error}</div>}
        <div className={styles.greetings}>
          <p className={styles.greetings_p}>{isLogin ? "É um prazer tê-lo conosco novamente, faça seu login para continuarmos organizando sua vida financeira!" :
          "Realize seu cadastro para começarmos a organizar a sua vida financeira!"}</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.auth_form}>
          {!isLogin && (
            <>
              <div className={styles.input_div}>
                <label className={styles.input_label}>Nome:</label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  required
                  className={styles.input}
                />
              </div>

              <div className={styles.input_div}>
                <label className={styles.input_label}>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className={styles.input}
                />
              </div>

              <div className={styles.input_div}>
                <label className={styles.input_label}>Senha:</label>
                <input
                  type="password"
                  name="senha"
                  value={formData.senha}
                  onChange={handleInputChange}
                  required
                  className={styles.input}
                />
              </div>

              <div className={styles.input_div}>
                <label className={styles.input_label}>Tipo da conta:</label>
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
            <label className={styles.input_label}>Email:</label>
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
            <label className={styles.input_label}>Senha:</label>
            <input
                type="password"
                name="senha"
                value={formData.senha}
                onChange={handleInputChange}
                required
                className={styles.input}
            />
          </div> 
          </>)}
          
          <div className={styles.btn_div}>
            <button type="submit" className={styles.auth_button}>{isLogin ? "Acessar" : "Cadastrar"}</button>
          </div>
        </form>

        <p className={styles.auth_mode}>
            {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}
            <span onClick={switchMode}
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