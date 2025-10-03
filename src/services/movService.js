import api from "./api.js";

const getIdConta = (idConta) => {
    
    if(idConta && !isNaN(idConta) && idConta > 0){
        return idConta;
    }

    try {
        const contaStorage = localStorage.getItem('contaSelecionada');
        if (contaStorage) {
            const conta = JSON.parse(contaStorage);
            if(conta?.idConta) {
                return conta.idConta;
            }
        }
    } catch (error) {
        console.log(error);
    }
    throw new Error('Nenhuma conta selecionada');
}

export const MovService = {
    
    criarMovimentacao: async (idConta, dados) => {
        try {
            const response = await api.post(`/mov/${idConta}`, dados);
            return response.data;
        } catch (error) {
            console.error("Algo deu errado ao criar.", error);
            throw error;
        }
    },

    listarMovimentacoes: async (idConta) => {
        try {
            const response = await api.get(`/mov/conta/${getIdConta(idConta)}`);
            return response.data;
        } catch (error) {
            console.error("Algo deu errado ao listar", error);
            throw error;
        }
    },

    obterMovimentacao: async (idConta, idMov) => {
        try {
            const response = await api.get(`/mov/${getIdConta(idConta)}/mov/${idMov}`);
            return response.data;
        } catch (error) {
            console.error("Algo deu errado ao buscar.", error);
            throw error;
        }
    },

    atualizarMovimentacao: async (idConta, idMov, dados) => {
        try {
        api.put(`/mov/${getIdConta(idConta)}/mov/${idMov}`, dados);
        } catch (error) {
            console.error("Algo deu errado ao atualizar.", error);
            throw error;
        }
    },

    deletarMovimentacao: async (idConta, idMov) => {
        try {
        api.delete(`/mov/${getIdConta(idConta)}/mov/${idMov}`);
        } catch (error) {
            console.error("Algo deu errado ao deletar.", error);
            throw error;
        }
    },

    extrato: async (idConta = null, filters = {}) => {
        try {
            const response = await api.get(`/mov/${getIdConta(idConta)}/extrato`, { params: filters });
            return response.data;
        } catch(error) {
            console.error("Opa, algo deu errado ao buscar o extrato.", {
                status: error.response?.status,
                data: error.response?.data,
                message: error.message,
                url: error.config?.url
            });
            return [];
        }
    },

    estatisticas: async (idConta = null, filters = {}) => {
        try {
            const response = await api.get(`/mov/${getIdConta(idConta)}/estatisticas`, { params: filters });
            return response.data;
        } catch(error) {
            console.error("Opa, algo deu errado ao buscar as estatísticas.", error);
            return {
                totalEntradas: 0,
                totalSaidas: 0,
                saldoPeriodo: 0,
                porCategoria: {},
                porTipo: {}
            }
        }
    },

    relatorioMensal: async (idConta = null, filters = {}) => {
        try{
            const response = api.get(`/mov/${getIdConta(idConta)}/relatorioMensal`, { param: filters });
            return response.data;
        } catch(error) {
            console.error("Opa, algo deu errado errado ao buscar o relatório mensal.", error);
            throw error;
        }
    }
}