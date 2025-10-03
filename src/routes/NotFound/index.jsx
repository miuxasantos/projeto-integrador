import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <>
            <h1>Erro 404: Página não encontrada!</h1>

            <p>A página que você tentou acessar não existe!</p>

            <Link to="/">
                Voltar para a página inicial
            </Link>
        </>
    );
}

export default NotFound;