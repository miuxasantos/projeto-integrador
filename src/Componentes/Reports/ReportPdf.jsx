import React, { useRef } from "react";
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from "@react-pdf/renderer";
import html2canvas from 'html2canvas';

const styles = StyleSheet.create({
    page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30
    },
    header: {
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    },
    table: {
        display: 'table',
        width: 'auto',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0
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
            <Page>
                <Text>Relatório</Text>
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