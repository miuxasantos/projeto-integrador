import React from 'react'
import { FaAt, FaUser, FaLock, FaAddressCard } from "react-icons/fa";
import * as styles from "./SignUp.module.css";

function SignUp() {
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
            <form className={styles.formSignUp}>
                <div className={styles.containerInput}>
                    <input type="nome" id="nome"
                        className={styles.inputStyle}
                        placeholder="Digite seu nome..."
                        required />
                    <FaUser className="icon" />
                </div>

                <div className={styles.containerInput}>
                    <input type="email" id="email"
                        className={styles.inputStyle}
                        placeholder="Digite seu email..."
                        required />
                    <FaAt className="icon" />
                </div>
                <div className={styles.containerInput}>
                    <select id="tipo-conta" name="Conta" className={styles.inputStyle}>
                        <option value="" disabled selected hidden>Escolha o tipo da sua conta...</option>
                        <option value="pessoal" id="pessoal">Pessoal</option>
                        <option value="pequena-empresa" id="pequena-empresa">Pequena empresa</option>
                    </select>
                    <FaAddressCard className="icon" />
                </div>
                <div className={styles.containerInput}>
                    <input type="password" id="password"
                        className={styles.inputStyle}
                        placeholder="Digite sua senha..."
                        required
                       />
                    <FaLock className="icon" />
                </div>

                <div>
                    <button id="btn-sigin" className={styles.btnSignUp}>Criar conta</button>
                </div>
            </form>
        </div>
    )
}

export default SignUp;
