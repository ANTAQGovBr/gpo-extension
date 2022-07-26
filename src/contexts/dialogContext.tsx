import React, { createContext, useState, useEffect, ReactNode } from 'react';

import { apiDB } from '../services/api';


export interface Process {
  DSTituloAnaliseREIDI: string; 
  IDEstadoAnaliseREIDI: number; 
  NOFantasiaEmpresa: string; 
  NRCodigoMINFRA: string | null; 
  IDContratoArrendamento: number | null; 
  contratoArrendamento: string; 
  DTProtocoloPedido: Date; 
  DSTituloManifestacaoANTAQ: string; 
  DTInicioAnaliseREIDI: Date | null; 
  DSEstadoManifestacaoANTAQ: string; 
  NRProcessoPrincipal: string; 
  IDProtocoloSEI: string; 
  MMObjeto: string; 
  DSTipoAcondicionamento: string; //perfil carga
  portoOrganizado: string; 
  prazoAnalise: number | string;
  NRProtocoloMINFRA: string; 
  rowNumber: string; //
  DSObservacoesSituacao: string; 
  NOUsuario: string; 
  DTFimAnaliseREIDI: Date | null; 
  NOGrupoMercadoria: string; 
  VLInvestimentoProposto: number; 
  IDAnaliseREIDIDocumentoSEI: string; 
  IDManifestacaoANTAQDocumentoSEI: string; 
}

const initialProcess: Process = {
  DSTituloAnaliseREIDI: '', 
  IDEstadoAnaliseREIDI: 1 , 
  NOFantasiaEmpresa: '', 
  NRCodigoMINFRA: '', 
  IDContratoArrendamento: null, 
  contratoArrendamento: '', 
  DTProtocoloPedido: Date.now(), 
  DSTituloManifestacaoANTAQ: '',  
  DTInicioAnaliseREIDI: null, 
  DSEstadoManifestacaoANTAQ: '', 
  NRProcessoPrincipal: '', 
  IDProtocoloSEI: '',        
  MMObjeto: '', 
  DSObservacoesSituacao: '', 
  DSTipoAcondicionamento: '', //perfil carga
  portoOrganizado: '', 
  prazoAnalise: 1 , //
  NRProtocoloMINFRA: '', 
  rowNumber: '', //
  DSObservacoesSituacao: '', 
  NOUsuario: '', 
  DTFimAnaliseREIDI: null, 
  NOGrupoMercadoria: '', 
  VLInvestimentoProposto: 0, 
  IDAnaliseREIDIDocumentoSEI: '',
  IDManifestacaoANTAQDocumentoSEI: '',
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
      const response = await apiDB.get(`/controlereidi/${encodedProcessNumber}`);
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

