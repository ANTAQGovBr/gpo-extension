import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import React, { useContext, useState } from 'react';
import { DialogContext } from '../../contexts/dialogContext';
import FormDatePicker from '../FormDatePicker';
import FormTextField from '../FormTextField';

export default function AnaliseForm(): JSX.Element {
  const { process, setProcess } = useContext(DialogContext);

  const [andamentoGPO, setAndamentoGPO] = useState('female');

  const handleRadioButtonChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAndamentoGPO((event.target as HTMLInputElement).value);
  };
  
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
          onChange={(newValue) =>
            setProcess({
              ...process,
              DTFimAnaliseREIDI: newValue,
              //tratamento de data DTFimAnaliseREIDI - DTInicioAnaliseREIDI em milisegundos
              prazoAnalise: Math.trunc((newValue.getTime() - process.DTInicioAnaliseREIDI.getTime()) /(1000 * 3600 * 24)),
            })
          }
        />
      </Grid>
      
      <Grid item xs={4}>
        <FormTextField
          label="Prazo de Análise"
          value={process.prazoAnalise || ''}
          disabled
          onChange={(e) =>
            setProcess({
              ...process,
              prazoAnalise: e.target.value
            })
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
            value={andamentoGPO}
            onChange={handleRadioButtonChange}
          >
            <FormControlLabel
              value="Pendente"
              control={<Radio />}
              label="Pendente"
            />
            <FormControlLabel
              value="Em análise"
              control={<Radio />}
              label="Em análise"
            />
            <FormControlLabel
              value="Finalizado"
              control={<Radio />}
              label="Finalizado"
            />
            <FormControlLabel value="Outro" control={<Radio />} label="Outro" />
          </RadioGroup>
        </FormControl>
      </Grid>
    </Grid>
  );
}
