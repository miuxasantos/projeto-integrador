import React from 'react'
import { Link } from 'react-router-dom'
import styles from "./Navb.module.css"
import useAuth from '../../context/AuthContext/useAuth'

const Navb = () => {
  const { user, logout } = useAuth();
  return (
    <nav className={styles.container}>
      <div>
          <Link className={styles.children} to="/">Home</Link>
          <Link className={styles.children} to="/user">User</Link>
          <Link className={styles.children} to="/conta">Conta</Link>
          <Link className={styles.children} to="/mov">Movimentações</Link>
          <Link className={styles.children} to="/metas">Metas</Link>
          <Link className={styles.children} to="/invest">Carteira de Investimentos</Link>
      </div>

      <div className={styles.navb__user}>
        <span>Bem vindo, {user?.nome}"</span>
        <button onClick={logout} className={styles.logout__btn}></button>
      </div>
    </nav>
  )
}

export default Navb
