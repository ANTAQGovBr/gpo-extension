import React, { createContext, useState, useEffect, ReactNode } from 'react';

import { apiDB } from '../services/api';

export interface Process {
  //TBControleREIDI
  NRProcessoPrincipal: string;
  IDProtocoloSEI: string;
  DTProtocoloPedido: Date;
  VLInvestimentoProposto: number;
  DSObservacoesSituacao: string;
  NRProtocoloMINFRA: string;
  NRCodigoMINFRA: string | null;

  //TBContratoArrendamento
  IDContratoArrendamento: number | null;
  CDContrato: string;
  NOFantasiaEmpresa: string;

  //TBClassificacaoSubclassificacaoCarga
  NOGrupoMercadoria: string;

  //TBTipoAcondicionamento
  DSTipoAcondicionamento: string; 

  //TBAnaliseREIDI
  DTInicioAnaliseREIDI: Date | null;
  DTFimAnaliseREIDI: Date | null;
  IDEstadoAnaliseREIDI: number | null;
  DSTituloAnaliseREIDI: string;
  IDAnaliseREIDIDocumentoSEI: string;
  prazoAnalise: number | string;

  //TBManifestacaoANTAQ
  IDEstadoManifestacaoANTAQ: number | null;
  DTManifestacaoANTAQ: Date | null;
  DSTituloManifestacaoANTAQ: string;
  NRManifestacaoANTAQDocumentoSEI: string;
  IDManifestacaoANTAQDocumentoSEI: string;

  //TBEstadoManifestacaoANTAQ
  DSEstadoManifestacaoANTAQ: string;

  //TBUsuario
  NOUsuarioReduzido: string;
  IDUsuario: string;

  //Sem relacao em Tb
  MMObjeto: string;
  CDBiGrama: string,
  CDTrigrama: string,
  NOPorto: string,
  rowNumber: string; //
}

const initialProcess: Process = {
  //TBControleREIDI
  NRProcessoPrincipal: '',
  IDProtocoloSEI: '',
  DTProtocoloPedido: null,
  VLInvestimentoProposto: 0,
  DSObservacoesSituacao: '',
  NRProtocoloMINFRA: '',
  NRCodigoMINFRA: '',
  //TBContratoArrendamento
  IDContratoArrendamento: null,
  CDContrato: '',
  NOFantasiaEmpresa: '',
  //TBClassificacaoSubclassificacaoCarga
  NOGrupoMercadoria: '',
  //TBTipoAcondicionamento
  DSTipoAcondicionamento: '', //perfil carga
  //TBAnaliseREIDI
  DTInicioAnaliseREIDI: null,
  DTFimAnaliseREIDI: null,
  IDEstadoAnaliseREIDI: null,
  DSTituloAnaliseREIDI: '',
  IDAnaliseREIDIDocumentoSEI: '',
  prazoAnalise: 0, //
  //TBManifestacaoANTAQ
  IDEstadoManifestacaoANTAQ: 0,
  DTManifestacaoANTAQ: null,
  DSTituloManifestacaoANTAQ: '',
  NRManifestacaoANTAQDocumentoSEI: '',
  IDManifestacaoANTAQDocumentoSEI: '',
  //TBEstadoManifestacaoANTAQ
  DSEstadoManifestacaoANTAQ: '',
  //TBUsuario
  NOUsuarioReduzido: '',
  IDUsuario: '',
  //Sem relacao em Tb
  MMObjeto: '',
  CDBiGrama: '',
  CDTrigrama: '',
  NOPorto: '',
  rowNumber: '', //
};

type ProcessContextType = {
  process: Process;
  setProcess: React.Dispatch<React.SetStateAction<Process>>;
  getProcess: (numeroProcesso: any) => Promise<void>;
};

export const DialogContext = createContext({} as ProcessContextType);

type ProcessContextProviderProps = {
  children: ReactNode;
};

export function DialogProvider({ children }: ProcessContextProviderProps) {
  const [process, setProcess] = useState<Process>(initialProcess);

  // Requisita e define um processo
  const getProcess = async (processNumber: string) => {
    const encodedProcessNumber = encodeURIComponent(processNumber);
    try {
      const response = await apiDB.get(
        `/controlereidi/${encodedProcessNumber}`
      );
      setProcess(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DialogContext.Provider value={{ process, setProcess, getProcess }}>
      {children}
    </DialogContext.Provider>
  );
}
