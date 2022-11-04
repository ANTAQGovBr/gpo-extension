import MaterialTable, { Column } from '@material-table/core';
import { ExportCsv, ExportPdf } from '@material-table/exporters';
import React, { useEffect, useState } from 'react';
import { apiDB } from '../services/api';
import { createRowModel } from '../services/utils';

const initialState: Column<any>[] = [
  { title: 'ID', field: 'IDControleREIDI', hidden: true },
  {
    title: 'Número do Processo',
    field: 'NRProcessoPrincipal',
  },
  { title: 'Data de Protocolo do Pedido', field: 'DTProtocoloPedido' },
  {
    title: 'Porto Organizado',
    field: 'NOPorto',
  },
  { title: 'Contrato de Arrendamento', field: 'CDContrato' },
  { title: 'Arrendatário', field: 'NOFantasiaEmpresa' },
  {
    title: 'Valor do Investimento Proposto',
    field: 'VLInvestimentoProposto',
  },
  { title: 'Perfil de Carga', field: 'DSTipoAcondicionamento' },
  { title: 'Tipo de Carga', field: 'NOGrupoMercadoria' },
  { title: 'Análise da GPO', field: 'DSTituloAnaliseREIDI' },
  { title: 'Objeto', field: 'MMObjeto' },
  { title: 'OBSERVAÇÃO e SITUAÇÃO', field: 'DSObservacoesSituacao' },
  { title: 'Técnico', field: 'NOUsuarioReduzido' },
  { title: 'Andamento GPO', field: 'IDEstadoAnaliseREIDI' },
  {
    title: 'Início da Análise - GPO',
    field: 'DTInicioAnaliseREIDI',
    type: 'date',
  },
  {
    title: 'Término da Análise - GPO',
    field: 'DTFimAnaliseREIDI',
    type: 'date',
  },
  { title: 'Prazo de Análise', field: 'prazoAnalise' },
  //{ title: 'Situação', field: 'DSObservacoesSituacao' },
  {
    title: 'Manifestação da ANTAQ (Diretoria/SOG)',
    field: 'IDEstadoManifestacaoANTAQ',
  },
  {
    title: 'Deliberação da diretoria (e/ou declaração técnica SOG)',
    field: 'DSTituloManifestacaoANTAQ',
  },
];

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

export default function DataGrid(): JSX.Element {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState<Column<any>[]>(initialState);

  const getProcesses = async () => {
    try {
      let processList = [];
      const response = await apiDB.get('/match-rows');
      response.data.forEach(async (element) => {
        let encodedProcessNumber = encodeURIComponent(
          element.NRProcessoPrincipal
        );
        const result = await apiDB.get(
          `/controlereidi/${encodedProcessNumber}`
        );
        processList.push(result.data)
      });
      await sleep(1e3);
      setData(processList);
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    getProcesses();
  }, []);

  // Requisita a criação de um novo processo
  const handleRowAdd = async (newData) => {
    const value = createRowModel(newData);
    try {
      await api.post('/spreadsheet', { value });
    } catch (error) {
      console.error(error);
    }
  };

  // Requisita a atualização do processo
  const handleRowUpdate = async (newData, oldData) => {
    const value = createRowModel(newData);
    try {
      await api.put(`/spreadsheet/${newData.id}`, { value });
    } catch (error) {
      console.error(error);
    }
  };

  // Requisita a exclusão do processo
  const handleRowDelete = async (oldData) => {
    const encodedProcessNumber = encodeURIComponent(oldData.numeroProcesso);
    try {
      await api.delete(`/row/${encodedProcessNumber}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ margin: 15, padding: 15, width: 1400 }}>
      <MaterialTable
        actions={[
          {
            icon: 'visibility',
            tooltip: 'Visualizar processo',
            onClick: (event, rowData) =>
              chrome.runtime.sendMessage({
                action: 'showREIDIDialog',
                type: 'edit',
                numeroProcesso: rowData.numeroProcesso,
              }),
          },
        ]}
        columns={columns}
        data={data}
        editable={{
          onRowAdd: (newData) => handleRowAdd(newData).then(getProcesses),
          onRowDelete: (oldData) => handleRowDelete(oldData).then(getProcesses),
          onRowUpdate: (newData, oldData) => handleRowUpdate(newData, oldData).then(getProcesses),
        }}
        localization={{
          body: {
            editRow: {
              deleteText: 'Tem certeza que deseja deletar esse registro?',
            },
          },
          grouping: {
            placeholder: 'Arraste os cabeçalhos aqui para agrupar',
          },
          header: {
            actions: 'Ações',
          },
          toolbar: {
            searchPlaceholder: 'Procurar',
          },
        }}
        onRowClick={(event, rowData): void =>
          chrome.runtime.sendMessage({
            action: 'showREIDIDialog',
            type: 'edit',
            numeroProcesso: rowData.numeroProcesso,
          })
        }
        options={{
          search: true,
          paging: true,
          filtering: true,
          grouping: true,
          sorting: true,
          pageSize: 35,
          pageSizeOptions: [5, 20, 35],
          maxBodyHeight: 700,
          minBodyHeight: 700,
          overflowY: 'scroll',
          exportMenu: [
            {
              label: 'Export PDF',
              exportFunc: (cols, datas) => ExportPdf(cols, datas, ''),
            },
            {
              label: 'Export CSV',
              exportFunc: (cols, datas) => ExportCsv(cols, datas, ''),
            },
          ],
        }}
        style={{ whiteSpace: 'nowrap' }}
        title="Tabela REIDI"
      />
    </div>
  );
}
