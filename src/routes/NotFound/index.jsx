import React from "react";
import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";
import notFound from "../../assets/img/notfound.png";

const NotFound = () => {
    return (
        <div className={styles.container__404}>
            <img src={notFound} className={styles.notFound__img} />
            <h1 className={styles.notFound__title}>Erro 404: Página não encontrada!</h1>

            <p className={styles.notFound__p}>A página que você tentou acessar não existe!</p>

            <Link className={styles.notFound__link} to="/">
                Voltar para a página inicial
            </Link>
        </div>
    );
}

export default NotFound;