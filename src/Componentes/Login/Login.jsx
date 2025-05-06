import React from 'react';
import { FaUser, FaLock } from "react-icons/fa";
import { useState } from 'react';
import * as styles from "./Login.module.css";
import SignIn from './SignIn/SignIn';
import SignUp from './SignUp/SignUp';

function Login() {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    {/* onChange={(event) => setUsarName(event.target.value)} */}

    const handleSubmitLoginForm = (event) => {
        event.preventDefault();
        alert("Enviando os dados...");
    };

    return (
        <div className={styles.container}>
        <SignUp />
        <SignIn />
        </div>
  );
}

export default Login;
