import React, { useState } from 'react'
import { FaAt, FaUser, FaLock, FaAddressCard } from "react-icons/fa";
import * as styles from "./SignUp.module.css";

function SignUp() {

    const { nome, setNome } = useState('');
    const { email, setEmail } = useState('');
    const { senha, setSenha } = useState('');
    const { tipoConta, setTipoConta } = useState('');

    const validaForm = () => {
        if (nome == '') {
            //mensagem de erro
            return false;
        } else {
            setNome('');
        }

        if (email == '') {
            //mensagem de erro
            return false;
        } else {
            setEmail('');
        }

        if (tipoConta == '') {
            //mensagem de erro
            return false;
        } else {
            setTipoConta('');
        }

        if (senha == '') {
            //mensagem erro
            return false;
        } else {
            setSenha('');
        }

        //chamada da api para POST
        return true;
    }
    

    const handleSubmit = (e) => {
        e.preventDefault();
    }
    return (
    <div className={styles.container}>
        <div className={styles.title}>
            <h1>Centauro</h1>
            <h2>Gestão Financeira Simplificada</h2>
        </div>
        <div className={styles.welcomeText}>
            <h3>Bem vindo!</h3>
            <p>Para criar sua conta, basta preencher os seguintes campos!</p>
        </div>
        <form onSubmit={handleSubmit} className={styles.formSignUp}>
            <div className={styles.containerInput}>
                <input type="nome" id="nome"
                    className={styles.inputStyle}
                    placeholder="Digite seu nome..."
                    value={nome}
                    onChange={(e) => {
                        setNome(e.target.value);
                    }}
                    required />
                <FaUser className="icon" />
            </div>

            <div className={styles.containerInput}>
                <input type="email" id="email"
                    className={styles.inputStyle}
                    placeholder="Digite seu email..."
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                    required />
                <FaAt className="icon" />
            </div>
            <div className={styles.containerInput}>
                <select id="tipo-conta"
                    name="Conta"
                    value={tipoConta}
                    onChange={(e) => {
                        setTipoConta(e.target.value);
                    }}
                    className={styles.inputStyle}>
                    <option value={null} disabled selected hidden>Escolha o tipo da sua conta...</option>
                    <option value={null} id="pessoal">Pessoal</option>
                    <option value={null} id="pequena-empresa">Pequena empresa</option>
                </select>
                <FaAddressCard className="icon" />
            </div>
            <div className={styles.containerInput}>
                <input type="password" id="password"
                    className={styles.inputStyle}
                    placeholder="Digite sua senha..."
                    value={senha}
                    onChange={(e) => {
                        setSenha(e.target.value);
                    }}
                    required
                />
                <FaLock className="icon" />
            </div>

            <div>
                <button id="btn-sigin"
                    className={styles.btnSignUp}
                    onClick={validaForm}
                >Criar conta</button>
            </div>
        </form>
    </div>
)
}

export default SignUp;
