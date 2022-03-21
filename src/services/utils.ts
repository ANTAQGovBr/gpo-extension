import { Process } from '../contexts/dialogContext';
import { api } from './api';

// Retorna um objeto JSON correspondente a linha da planilha.
export const createRowModel = (row: Process) => {
  const value = {
    'Número do Processo': row.numeroProcesso,
    'Data de protocolo do pedido': row.dataProtocoloPedido,
    'Porto Organizado': row.portoOrganizado,
    'Contrato de Arrendamento': row.contratoArrendamento,
    Arrendatário: row.arrendatario,
    'Valor do investimento proposto': row.valorInvestimentoProposto,
    'Perfil de carga': row.perfilCarga,
    'Tipo de carga': row.tipoCarga,
    'Análise da GPO': row.analiseGPO,
    OBJETO: row.objeto,
    OBSERVAÇÕES: row.observacoes,
    TÉCNICO: row.tecnico,
    'Andamento GPO': row.andamentoGPO,
    'Início da Análise - GPO': row.inicioAnaliseGPO,
    'Término da Análise - GPO': row.terminoAnaliseGPO,
    'Prazo de Análise': row.prazoAnalise,
    SITUAÇÃO: row.situacao,
    'Manifestação da ANTAQ (Diretoria/SOG)': row.manifestacaoANTAQ,
    'Deliberação da diretoria (e/ou declaração técnica SOG)': row.deliberacaoDiretoria,
  };
  return value;
};

export const matchRows = async (rows: string[]) => {
  try {
    const response = await api.get(`/match-rows`);
    const { rowsProcessNumbers } = response.data;

    const result = rows.filter((item) => rowsProcessNumbers.includes(item));
    return result;
  } catch (error) {
     throw Error(error)
  }
};
