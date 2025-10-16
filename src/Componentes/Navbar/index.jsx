import React from 'react'
import { Link } from 'react-router-dom'
import styles from "./Navb.module.css"
import useAuth from '../../context/AuthContext/useAuth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'

const Navb = () => {
  const { usuario, logout } = useAuth();
  return (
    <nav className={styles.container}>
      <div className={styles.title_container}>
        <h1 className={styles.title}>Centauro</h1>
        <h2 className={styles.subtitle}>Gestão Financeira Simplificada</h2>
      </div>

      <div className={styles.div}>
          <Link className={styles.children} to="/">Home</Link>
          <Link className={styles.children} to="/user">User</Link>
          <Link className={styles.children} to="/conta">Conta</Link>
          <Link className={styles.children} to="/mov">Movimentações</Link>
          <Link className={styles.children} to="/metas">Metas</Link>
          <Link className={styles.children} to="/invest">Carteira de Investimentos</Link>
      </div>

      <div className={styles.navb_user}>
        <span>Bem vindo, {usuario?.nome}</span>
        <button onClick={logout} className={styles.logout_btn}>
          <FontAwesomeIcon icon={faRightFromBracket} size='lg' className={styles.logout__icon} />
        </button>
      </div>
    </nav>
  )
}

export default Navb
