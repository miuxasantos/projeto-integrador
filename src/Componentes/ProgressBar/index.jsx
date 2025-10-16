import React from 'react';
import styles from "./ProgressBar.module.css";

const ProgressBar = ({ porcentagem }) => {
  const porcentagemAjustada = Math.min(Math.max(porcentagem, 0), 100);
  const metaConcluida = porcentagemAjustada >= 100;

  return (
    <div className={styles.container}>
      <div className={styles.barraContainer}>
        <div className={`${styles.barraFill} ${styles.primary}`} style={{ width: `${porcentagemAjustada}%`, }}>
            <span className={styles.barraTexto}>
              {porcentagemAjustada.toFixed(1)}%
            </span>
            { metaConcluida ? <span>Meta concluída!</span> : ""}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;