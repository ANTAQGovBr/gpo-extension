import { Process } from '../contexts/dialogContext';
import { apiDB } from './api';

// Retorna um objeto JSON correspondente a linha da planilha.
export const createRowModel = (row: Process) => {
  const value = {
    'Número do Processo': row.NRProcessoPrincipal,
    'Data de protocolo do pedido': row.DTProtocoloPedido,
    'Porto Organizado': row.NOPorto,
    'Contrato de Arrendamento': row.CDContrato,
    'Arrendatário': row.NOFantasiaEmpresa,
    'Valor do investimento proposto': row.VLInvestimentoProposto,
    'Perfil de carga': row.DSTipoAcondicionamento,
    'Tipo de carga': row.NOGrupoMercadoria,
    'Análise da GPO': row.DSTituloAnaliseREIDI,
    'OBJETO': row.MMObjeto,
    'OBSERVAÇÃO e SITUAÇÃO': row.DSObservacoesSituacao, 
    'TÉCNICO': row.NOUsuarioReduzido,
    'Andamento GPO': row.IDEstadoAnaliseREIDI,
    'Início da Análise - GPO': row.DTInicioAnaliseREIDI,
    'Término da Análise - GPO': row.DTFimAnaliseREIDI,
    'Prazo de Análise': row.prazoAnalise,
    //'SITUAÇÃO': row.DSObservacoesSituacao,
    'Manifestação da ANTAQ (Diretoria/SOG)': row.IDEstadoManifestacaoANTAQ,
    'Deliberação da diretoria (e/ou declaração técnica SOG)':
      row.DSTituloManifestacaoANTAQ,
  };
  return value;
};

export const matchRows = async (SEIProcessNumbers: string[]) => {
  try {
    const response = await apiDB.get('/match-rows');

    const NRProcessoPrincipalArray = response.data.map((element) => element.NRProcessoPrincipal);

    const result = SEIProcessNumbers.filter((item) => NRProcessoPrincipalArray.includes(item));

    return result;
  } catch (error) {
    throw Error(error);
  }
};
