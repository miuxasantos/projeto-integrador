import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { chartOptions } from '../../services/chartService.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data, title }) => {

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

    return (
        <div>
            <Pie
                data={chartData}
                options={{
                    ...chartOptions,
                    plugins: {
                        ...chartOptions.plugins,
                        title: {
                            display: true,
                            text: title || 'Distribuição por Categoria'
                        }
                    }
                }}
            />
        </div>
    );
}

export default PieChart;