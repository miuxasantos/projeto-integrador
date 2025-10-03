export const generatePdfData = (estatisticas, extrato, periodo) => {
    return {
        periodo,
        totais: {
            entradas: estatisticas.totalEntradas,
            saidas: estatisticas.totalSaidas,
            saldo: estatisticas.saldoPeriodo,
        },
        categorias: estatisticas.porCategoria,
        movimentacoes: extrato.slice(0, 50),
    };
}