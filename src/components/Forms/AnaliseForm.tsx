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

export default function AnaliseForm(): JSX.Element {
  const { process, setProcess } = useContext(DialogContext);

  const handleRadioButtonChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setProcess({
      ...process,
      IDEstadoAnaliseREIDI: Number((event.target as HTMLInputElement).value),
    });
  };

  const handlePrazoAnalise = () => {
    setProcess({
      ...process,
      //tratamento de data DTFimAnaliseREIDI - DTInicioAnaliseREIDI em milisegundos
      prazoAnalise: (Math.trunc((process.DTFimAnaliseREIDI.getTime() - process.DTInicioAnaliseREIDI.getTime()) / (1000 * 3600 * 24)) + 1),
    })
  }

  const [CanCalculate, setCanCalculate] = useState<Boolean>(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (CanCalculate) {
      if (process.DTFimAnaliseREIDI !== null && process.DTInicioAnaliseREIDI !== null) {
        handlePrazoAnalise()
      }
      setCanCalculate(false)
    }
  }, [CanCalculate]);

  React.useEffect(() => {
    if (!open) {
      if (process.DTInicioAnaliseREIDI !== null) (
        process.DTInicioAnaliseREIDI = new Date (Date.parse(process.DTInicioAnaliseREIDI.toString()))
      )
      if (process.DTFimAnaliseREIDI !== null) (
        process.DTFimAnaliseREIDI = new Date (Date.parse(process.DTFimAnaliseREIDI.toString()))
      )
      setCanCalculate(true);
    }
  }, [open]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="caption" sx={{ fontSize: 24, color: '#1976d2' }}>
          GPO
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <FormTextField
          label="Técnico"
          value={process.NOUsuario || ''}
          onChange={(e) =>
            setProcess({
              ...process,
              NOUsuario: e.target.value,
            })
          }
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
          onChange={(newValue) =>
            setProcess({
              ...process,
              DTInicioAnaliseREIDI: newValue,
            })
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
            setCanCalculate(true)
          }
          }
        />
      </Grid>

      <Grid item xs={4}>
        <FormTextField
          label="Prazo de Análise"
          value={process.prazoAnalise || ''}
          disabled
          onLoad={() => {
            setCanCalculate(true)
          }
          }
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
