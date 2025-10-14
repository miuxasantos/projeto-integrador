import React, { useState, useEffect, useCallback } from "react";
import { MovService } from "../../services/MovService";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ReportPdf from "../Reports/ReportPdf";
import { prepareChart } from "../../services/chartService";
import PieChart from "../Graficos/PieChart";
import BarChart from "../Graficos/BarChart";
import Filtro from "../Filtros";
import styles from "./Dashboard.module.css";


const Dashboard = ({ contaSelec }) => {
    const [ estatisticas, setEstatisticas ] = useState({});
    const [ extrato, setExtrato ] = useState([]);
    const [ relatorioMensal, setRelatorioMensal ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ periodo, setPeriodo ] = useState({
        mes: new Date().getMonth() + 1,
        ano: new Date().getFullYear(),
    });

    const carregarDados = useCallback(async () => {

        if (!contaSelec?.idConta) {
            console.warn("Nenhuma conta selecionada para carregar dados");
            setEstatisticas({});
            setExtrato([]);
            setRelatorioMensal([]);
            setLoading(false);
            return;
        }

        try {
            setLoading(true);

            const [ dadosEstatisticas, dadosExtrato, dadosRelatorioMensal ] = await Promise.all([
                MovService.estatisticas(contaSelec.idConta, periodo),

                MovService.extrato(contaSelec.idConta, {}),

                MovService.relatorioMensal(contaSelec.idConta, periodo),
            ]);

            setEstatisticas(dadosEstatisticas || {});
            setExtrato(dadosExtrato || []);
            setRelatorioMensal(dadosRelatorioMensal || []);
        } catch(error) {
            console.error("Algo deu errado. ", error);
            setEstatisticas({});
            setExtrato([]);
            setRelatorioMensal([]);
        } finally {
            setLoading(false);
        }
    }, [contaSelec.idConta, periodo])

    useEffect(() => {
        if(contaSelec){
            carregarDados();
        } else {
            setLoading(false);
            console.log("Nenhuma conta encontrada");
        }
    }, [contaSelec, periodo.mes, periodo.ano, carregarDados]);

    const handleFiltro = (filtros) => {
        setPeriodo(filtros);
    }
    const chartData = prepareChart(estatisticas) || {
        pieData: {
        labels: [],
        datasets: [{ data: [] }]
        },
        barData: {
            labels: [],
            datasets: [{ data: [] }]
        }
    };

    if(loading) {
        return <p>Carregando o Dashboard...</p>
    }

    return (
        <div className={styles.container}>

            <div className={styles.header}>
                <h2>Dashboard - {contaSelec.nome}</h2>
                <div className={styles.controls}>
                    <Filtro onFiltrar={handleFiltro} />
                    <button onClick={carregarDados} className={styles.btnAtualizar}>Atualizar</button>
                </div>

                <div className={styles.content_pdf}>
                    {estatisticas && extrato && relatorioMensal &&
                        <PDFDownloadLink
                            document={
                                <ReportPdf 
                                    data={{ estatisticas, extrato, relatorioMensal }}
                                    periodo={`${new Date().getMonth() + 1}/${new Date().getFullYear()}`}
                                />
                            }

                            fileName="relatorio.pdf"
                            className={styles.pdfLink}>

                            {({ loading }) => (loading ? 'Gerando PDF...' : 'Baixar Relatório')}
                        </PDFDownloadLink>
                    }
                </div>
            </div>

            <div className={styles.content_chart}>

                <div className={styles.charts}>
                    <div className={styles.piechart}>
                        <PieChart data={chartData.pieChartData} title="Distribuição por categoria" />
                    </div>

                    <div className={styles.barchart}>
                        <BarChart data={chartData.barChartData} title="Resumo financeiro" />
                    </div>
                </div>

              </div>

              <div className={styles.summary__container}>
                <div className={styles.summary}>
                    <h3>Resumo</h3>
                    <p>Entradas: R$ {estatisticas.totalEntradas?.toFixed(2)}</p>
                    <p>Saídas: R$ {estatisticas.totalSaidas?.toFixed(2)}</p>
                    <p>Saldo: R$ {estatisticas.saldoPeriodo?.toFixed(2)}</p>
                </div>

                <div className={styles.last}>
                    <h3>Últimas Movimentações</h3>
                    {extrato.slice(0, 5).map(mov => (
                    <div key={mov.idMov}>
                        {mov.nome} - R$ {mov.valor}
                    </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Dashboard;