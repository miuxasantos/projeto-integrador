import React, { useState } from "react";
import styles from "./Filtros.module.css";

const Filtro = ({ onFiltrar }) => {
    const [ mes, setMes ] = useState(new Date().getMonth() + 1);
    const [ ano, setAno ] = useState(new Date().getFullYear());

    const handleFiltrar = () => {
        onFiltrar({ mes: parseInt(mes), ano: parseInt(ano) });
    };

    return (
        <div className={styles.container_filtro}>
            <select className={styles.select_filtro} value={mes} onChange={(e) => {setMes(e.target.value)}}>
                <option value={1}>Janeiro</option>
                <option value={2}>Fevereiro</option>
                <option value={3}>Março</option>
                <option value={4}>Abril</option>
                <option value={5}>Maio</option>
                <option value={6}>Junho</option>
                <option value={7}>Julho</option>
                <option value={8}>Agosto</option>
                <option value={9}>Setembro</option>
                <option value={10}>Outubro</option>
                <option value={11}>Novembro</option>
                <option value={12}>Dezembro</option>
            </select>

            <input
                className={styles.input_filtro}
                type="number" 
                value={ano} 
                onChange={(e) => setAno(e.target.value)}
                min="2000" 
                max="2100" 
            />

            <button className={styles.btn_filtro} onClick={handleFiltrar}>Filtrar</button>
        </div>
    )
}

export default Filtro;