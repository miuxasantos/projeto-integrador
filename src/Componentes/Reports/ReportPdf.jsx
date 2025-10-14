import React from "react";
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: {
    flexDirection: 'column',
    backgroundColor: '#f8f8f3',
    padding: 20,
    },
    header: {
        paddingVertical: 10,
        fontSize: 20,
        margin: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#04471c',
        backgroundColor: '#b0d6af',
        borderRadius: 30,
    },
    title: {
        paddingVertical: 10,
        marginBottom: 10,
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18,
    },
    section: {
        backgroundColor: '#b0d6af',
        margin: 10,
        padding: 20,
        flexGrow: 1,
        border: '2pt solid #04471c',
        borderRadius: 30,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333333'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
        paddingVertical: 3
    },
    table: {
        backgroundColor: '#b0d6af',
        display: 'table',
        width: 'auto',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0,
        border: '2pt solid #04471c',
        borderRadius: 30,
        padding: 20,
    },
    tableRow: {
        margin: 'auto',
        flexDirection: 'row'
    },
    tableCol: {
        width: '25%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0
    },
    tableCell: {
        margin: 'auto',
        marginTop: 5,
        fontSize: 10
    }
});


const ReportPdf = ({ data, periodo }) => {
    return (
        <Document>
            <Page style={styles.page}>
                <Text style={styles.header}>Cenaturo Gestão Financeira Simplificada</Text>
                <Text style={styles.title}>Relatório</Text>
                <Text>Período: {periodo}</Text>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Resumo</Text>
                    <View style={styles.row}>
                        <Text>Entradas:</Text>
                        <Text>R$ {data.estatisticas.totalEntradas?.toFixed(2) || '0.00'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text>Saídas:</Text>
                        <Text>R$ {data.estatisticas.totalSaidas?.toFixed(2) || '0.00'}</Text>
                    </View>
                    <View style={styles.row}>
                            <Text>Saldo:</Text>
                    <Text>R$ {data.estatisticas.saldoPeriodo?.toFixed(2) || '0.00'}</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Últimas Movimentações</Text>
                    {data.extrato.slice(0, 10).map((mov, index) => (
                        <View key={index} style={styles.row}>
                            <Text>{mov.nome}</Text>
                            <Text>R$ {mov.valor}</Text>
                        </View>
                    ))}
                </View>
            
            </Page>
        </Document>
    )};

export default ReportPdf;