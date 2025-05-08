import React from 'react'
import { FaUser, FaLock } from "react-icons/fa";
import styles from "./SignIn.module.css";

function SignIn() {
    const handleSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <div className={styles.container} /* {...props} */>
                <div className={styles.title}>
                    <h1>Centauro</h1>
                    <h2>Gestão Financeira Simplificada</h2>
                </div>
                <div className={styles.welcomeBackText}>
                    <h3>Bem vindo de volta!</h3>
                    <p>É um prazer tê-lo conosco novamente. </p>
                    <p>Faça seu login para continuarmos organizando sua vida financeira!</p>
                </div>
            <form onSubmit={handleSubmit} className={styles.formSignin} /*onSubmit={handleSubmitLoginForm} */>
                <div className={styles.containerInput}>
                    <input type="email" className={styles.emailAndPassword}
                        id="email"
                        placeholder="Digite seu email..."
                        required
                        /* onChange={(event) => setUsarName(event.target.value)} *//>
                    <FaUser size={20} className={styles.icon} />
                </div>
                <div className={styles.containerInput}>
                    <input type="password" className={styles.emailAndPassword}
                        id="password"
                        placeholder="Digite sua senha..."
                        required
                        /* onChange={(event) => setPassword(event.target.value)} *//>
                    <FaLock size={20} className={styles.icon} />
                </div>

                <label className={styles.checkboxContainer}>
                    Lembre-se de mim
                    <input type="checkbox"
                    className={styles.checkbox}/>
                    <span className={styles.checkmark}></span>
                </label>

                <div className={styles.signUp}>
                    <p><a href="#">Cadastrar-se</a></p>
                </div>

                <button className={styles.btnSignin} id="btn-login">Sign in</button>
            </form>
        </div>
    )
}

export default SignIn;
