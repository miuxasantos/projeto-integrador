import { Tooltip } from "chart.js";

export const prepareChart = (estatisticas) => {
    
    if(!estatisticas){
        return {
            pieData: {
                labels: ['Sem dados'],
                datasets: [{ data: [1], backgroundColor: ['#CCCCCC'] }]
            },
            barData: {
                labels: ['Entradas', 'Saídas', 'Saldo'],
                datasets: [{ data: [0, 0, 0], backgroundColor: ['#4CAF50', '#F44336', '#2196F3'] }]
            }
        };
    }

    const pieChartData = {
        labels: Object.keys(estatisticas.porCategoria || {}),
        datasets: [
            {
                data: Object.values(estatisticas.porCategoria || {}),
                backgroundColor: [
                    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', 
                    '#9966FF', '#FF9F40', '#FF6384', '#C9CBCF'
        ],
            }
        ]
    }

    const barChartData = {
        labels: ['Entradas', 'Saídas', 'Saldo'],
        datasets: [
            {
                label: 'Valores (R$)',
                data: [
                    estatisticas.totalEntradas || 0,
                    estatisticas.totalSaidas || 0,
                    estatisticas.saldoPeriodo || 0,
                ],
                backgroundColor: ['#4CAF50', '#F44336', '#2196F3'],
            }
        ]
    }

    return { pieChartData, barChartData };
};

export const chartOptions = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        tooltip: {
            callbacks: {
                label: function(context){
                    return `R$ ${context.raw.toFixed(2)}`;
                }
            }
        }
    }
};