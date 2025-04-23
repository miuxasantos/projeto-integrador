import React from 'react';
import { FaUser, FaLock } from "react-icons/fa";
import { useState } from 'react';
import styles from "./Login.modules.css";

function Login() {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmitLoginForm = (event) => {
        event.preventDefault();
        alert("Enviando os dados...");
    };

  return (
    <div className="container">
      <form onSubmit={handleSubmitLoginForm}>
        <h1>Faça seu login!</h1>
        <div>
            <input type="email" id="email" 
            placeholder="Digite seu email..."
            required
                onChange={(event) => setUsarName(event.target.value)}/>
            <FaUser className="icon" />
        </div>
        <div>
            <input type="senha"  id="senha" placeholder="Digite sua senha..." 
                onChange={(event) => setPassword(event.target.value)}/>
            <FaLock className="icon" />
        </div>

        <div className="dont-forget">
            <label htmlFor="">
                <input type="checkbox" />
                Lembre de mim.
            </label>
        </div>

        <div className="sign-up">
            <p><a href="#" Cadastrar-se /></p>
        </div>
        <button id="btn-login">Sign in</button>
      </form>
    </div>
  );
}

export default Login
