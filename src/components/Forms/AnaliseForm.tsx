import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import { copyFileSync } from 'fs';
import React, { useContext, useState, useEffect } from 'react';
import { DialogContext } from '../../contexts/dialogContext';
import FormDatePicker from '../FormDatePicker';
import FormTextField from '../FormTextField';
import { AsynchronousAutocomplete } from '../AsynchronousAutocomplete';
import { apiDB } from '../../services/api';

export default function AnaliseForm(): JSX.Element {
  const { process, setProcess } = useContext(DialogContext);
  const [usuarioValue, setUsuarioValue] = useState<
    string | null
  >(null);

  const handleGetUsuarioOptions = async () => {
    try {
      const response = await apiDB.get("usuario");
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSetUsuarioValue = (value) => {
    if (process.IDUsuario && !value) {
      return {
        IDUsuario: process.IDUsuario,
        NOUsuarioReduzido: process.NOUsuarioReduzido,
      }
    }
    else return value;
  };

  const handleUsuarioChange = (
    event: any,
    newValue: any | null
  ) => {
    setUsuarioValue(newValue);
    const { IDUsuario } = newValue;
    setProcess({
      ...process,
      IDUsuario: IDUsuario,
    })
  };


  const handleRadioButtonChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setProcess({
      ...process,
      IDEstadoAnaliseREIDI: Number((event.target as HTMLInputElement).value),
    });
  };

  const [calculate, setCalculate] = useState<Boolean>(true);

  useEffect(() => {
    if (calculate ) {
      //verificacao de inicializacao diferencial de nulo
      if (process.DTFimAnaliseREIDI !== null && process.DTInicioAnaliseREIDI !== null) {
        process.DTInicioAnaliseREIDI = new Date(Date.parse(process.DTInicioAnaliseREIDI.toString()))
        process.DTFimAnaliseREIDI = new Date(Date.parse(process.DTFimAnaliseREIDI.toString()))
        //comparacao de datas
        if (process.DTInicioAnaliseREIDI <= process.DTFimAnaliseREIDI) {
          setProcess({
            ...process,
             //calculo de data DTFimAnaliseREIDI - DTInicioAnaliseREIDI em milisegundos
            prazoAnalise: (Math.trunc((process.DTFimAnaliseREIDI.getTime() - process.DTInicioAnaliseREIDI.getTime()) / (1000 * 3600 * 24)) + 1),
          })
        } else {
          setProcess({
            ...process,
            //Mensagem de aviso de data invalida
            prazoAnalise: "Data Inválida"
          })
        }
      }
      setCalculate(false);
    }
  }, [calculate]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="caption" sx={{ fontSize: 24, color: '#1976d2' }}>
          GPO
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <AsynchronousAutocomplete
          value={handleSetUsuarioValue(usuarioValue)}
          onChange={handleUsuarioChange}
          handleGetOptions={() =>
            handleGetUsuarioOptions()
          }
          optionLabel="NOUsuarioReduzido"
          label="Técnico"
        />
      </Grid>
      <Grid item xs={8}>
        <FormTextField
          label="Análise da GPO"
          fullWidth
          value={process.DSTituloAnaliseREIDI || ''}
          onChange={(e) =>
            setProcess({
              ...process,
              DSTituloAnaliseREIDI: e.target.value,
            })
          }
        />
      </Grid>
      <Grid item xs={4}>
        <FormDatePicker
          label="Início da Análise - GPO"
          value={process.DTInicioAnaliseREIDI || null}
          onChange={(newValue) => {
            setProcess({
              ...process,
              DTInicioAnaliseREIDI: newValue,
            })
            setCalculate(true)
          }
          }
        />
      </Grid>

      <Grid item xs={4}>
        <FormDatePicker
          label="Término da Análise - GPO"
          value={process.DTFimAnaliseREIDI || ''}
          onChange={(newValue) => {
            setProcess({
              ...process,
              DTFimAnaliseREIDI: newValue,
            })
            setCalculate(true)
          }
          }
        />
      </Grid>

      <Grid item xs={4}>
        <FormTextField
          label="Prazo de Análise"
          value={process.prazoAnalise || ''}
          disabled
        />
      </Grid>

      <Grid item xs={12}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Andamento GPO</FormLabel>
          <RadioGroup
            row
            aria-label="andamentoGPO"
            name="controlled-radio-buttons-group"
            value={String(process.IDEstadoAnaliseREIDI)}
            onChange={handleRadioButtonChange}
          >
            <FormControlLabel
              value="1"
              control={<Radio />}
              label="Para Distribuição"
            />
            <FormControlLabel
              value="2"
              control={<Radio />}
              label="Análise em Curso"
            />
            <FormControlLabel
              value="3"
              control={<Radio />}
              label="Avaliação Gerencial"
            />
            <FormControlLabel
              value="4"
              control={<Radio />}
              label="Aguardando Elementos Externos"
            />
            <FormControlLabel
              value="5"
              control={<Radio />}
              label="Finalizado"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
    </Grid>
  );
}
