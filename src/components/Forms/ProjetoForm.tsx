import { Grid, InputAdornment } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { DialogContext } from '../../contexts/dialogContext';
import { apiDB } from '../../services/api';
import { AsynchronousAutocomplete } from '../AsynchronousAutocomplete';
import FormTextField from '../FormTextField';


export interface IPorto {
  CDBiGrama: string;
  CDTrigrama: string;
  NOPorto: string;
}
export interface IContrato {
  IDContratoArrendamento: number;
  CDContrato: string;
}

export default function ProjetoForm(): JSX.Element {
  const { process, setProcess } = useContext(DialogContext);
  const [portoValue, setPortoValue] = useState<IPorto | null>(null);
  const [contratoArrendamentoValue, setContratoArrendamentoValue] = useState<IContrato | null>(null);
  const [isDisabled, setDisabled] = useState(true);

  const handleGetPortosOptions = async () => {
    try {
      const response = await apiDB.get('portos');
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetContratosOptions = async (CDTriGrama: string) => {
    try {
      const response = await apiDB.get(`contratoarrendamento/${CDTriGrama}`);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setPortoValue(handleSetPortoValue(portoValue))
    if (portoValue !== null) {
      setDisabled(false);
      setContratoArrendamentoValue(handleSetContratoValue(contratoArrendamentoValue));
    } else {
      setDisabled(true);
      //setContratoArrendamentoValue(handleSetContratoValue(null));
    }
    setContratoArrendamentoValue(handleSetContratoValue(null));
  }, [portoValue]);

  const handleSetPortoValue = (value) => {
    if (process.IDContratoArrendamento && !value) {
      if (!isDisabled) {
        return value;
      } else {
        return {
          CDBiGrama: process.CDBiGrama,
          CDTrigrama: process.CDTrigrama,
          NOPorto: process.NOPorto,
        }
      }
    } else {
      return value;
    }
  };

  const handleSetContratoValue = (value) => {
    if (process.IDContratoArrendamento && !value) {
      if (!isDisabled) {
        return value;
      } else {
        return {
          IDContratoArrendamento: process.IDContratoArrendamento,
          CDContrato: process.CDContrato,
        }
      }
    }
    else {
      return value;
    }
  };

  const handlePortoChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: IPorto | null
  ): void => {
    setPortoValue(newValue);
  };

  const handleContratoArrendamentoChange = (
    event: any,
    newValue: any | null
  ) => {
    if (newValue !== null) {
      console.log(newValue.IDContratoArrendamento)
    }
      setContratoArrendamentoValue(newValue);
      const { IDContratoArrendamento } = newValue;
      setProcess({
        ...process,
        IDContratoArrendamento: IDContratoArrendamento,
      })
    };

    return (
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <AsynchronousAutocomplete
            value={portoValue}
            onChange={handlePortoChange}
            handleGetOptions={() => handleGetPortosOptions()}
            optionLabel="NOPorto"
            label="Portos"
          />
        </Grid>
        <Grid item xs={4}>
          <AsynchronousAutocomplete
            value={contratoArrendamentoValue}
            onChange={handleContratoArrendamentoChange}
            handleGetOptions={() =>
              handleGetContratosOptions(portoValue.CDTrigrama)
            }
            optionLabel="CDContrato"
            label="Contrato"
            disabled={isDisabled}
          />
        </Grid>
        <Grid item xs={4}>
          <FormTextField
            label="Valor do Investimento Proposto"
            value={process.VLInvestimentoProposto || ''}
            onChange={(e) =>
              setProcess({
                ...process,
                VLInvestimentoProposto: parseInt(e.target.value),
              })
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">R$</InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <FormTextField
            disabled
            label="Empresa"
            value={process.NOFantasiaEmpresa || ''}
            onChange={(e) =>
              setProcess({
                ...process,
                NOFantasiaEmpresa: e.target.value,
              })
            }
          />
        </Grid>
        <Grid item xs={4}>
          <FormTextField
            disabled
            label="Perfil de carga"
            value={process.DSTipoAcondicionamento || ''}
            onChange={(e) =>
              setProcess({
                ...process,
                DSTipoAcondicionamento: e.target.value,
              })
            }
          />
        </Grid>
        <Grid item xs={8}>
          <FormTextField
            disabled
            label="Tipo de Carga"
            multiline
            value={process.NOGrupoMercadoria || ''}
            onChange={(e) =>
              setProcess({
                ...process,
                NOGrupoMercadoria: e.target.value,
              })
            }
          />
        </Grid>
        <Grid item xs={12}>
          <FormTextField
            disabled
            label="Objeto"
            multiline
            value={process.MMObjeto || ''}
            onChange={(e) =>
              setProcess({
                ...process,
                MMObjeto: e.target.value,
              })
            }
          />
        </Grid>
      </Grid>
    );
  }
