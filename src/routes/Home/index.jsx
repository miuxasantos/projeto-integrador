import React from 'react';
import styles from "./Home.module.css";
import { useOutletContext } from 'react-router-dom';

const Home = () => {
  const { user } = useOutletContext;

  return (
    <div>
        <h1>Bem-vindo {user?.nome}, ao aplicativo de finanças pessoais Centauro</h1>
    </div>
  )
}

export default Home;
