import React from "react";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import  { chartOptions } from "../../services/chartService.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ data, title }) => {

    if (!data || !data.labels || !data.datasets) {
        return (
            <div>
                <h3>{title}</h3>
                <p>Não há dados disponíveis para o gráfico</p>
            </div>
        );
    }

    const chartData = {
        labels: data.labels || [],
        datasets: data.datasets?.map(dataset => ({
            label: dataset.label || '',
            data: dataset.data || [],
            backgroundColor: dataset.backgroundColor || '#36A2EB',
            borderColor: dataset.borderColor || '#36A2EB',
            borderWidth: dataset.borderWidth || 1,
        })) || []
    };

    return(
        <div>
            <Bar
                data={chartData}
                options={{
                    ...chartOptions,
                    responsive: true,
                    plugins: {
                        ...chartOptions.plugins,
                        title: {
                            display: true,
                            text: title || 'Resumo financeiro'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: function(value) {
                                    return 'R$' + value.toFixed(2);
                                }
                            }
                        }
                    }
                }}
            />
        </div>
    );
}

export default BarChart;