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
import FormTextField from '../FormTextField';
import FormDatePicker from '../FormDatePicker';

export default function ManifestacaoForm(): JSX.Element {
  const { process, setProcess } = useContext(DialogContext);

  const handleRadioButtonChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setProcess({
      ...process,
      IDEstadoManifestacaoANTAQ: Number((event.target as HTMLInputElement).value),
    });
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="caption" sx={{ fontSize: 24, color: '#1976d2' }}>
          Diretoria/SOG
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <FormDatePicker
          label="Data Manifestação ANTAQ"
          value={process.DTManifestacaoANTAQ || null}
          onChange={(newValue) =>
            setProcess({
              ...process,
              DTManifestacaoANTAQ: newValue,
            })
          }
        />
      </Grid>
      <Grid item xs={8}>
        <FormTextField
          label="Deliberação da Diretoria"
          fullWidth
          value={process.DSTituloManifestacaoANTAQ || ''}
          onChange={(e) =>
            setProcess({
              ...process,
              DSTituloManifestacaoANTAQ: e.target.value,
            })
          }
          helperText="e/ou declaração técnica SOG"
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Manifestação ANTAQ</FormLabel>
          <RadioGroup
            row
            aria-label="andamentoGPO"
            name="controlled-radio-buttons-group"
            value={String(process.IDEstadoManifestacaoANTAQ)}
            onChange={handleRadioButtonChange}
          >
            <FormControlLabel
              value="0"
              control={<Radio />}
              label="Não avaliado"
            />
            <FormControlLabel value="1" control={<Radio />} label="Aprovado" />
            <FormControlLabel
              value="2"
              control={<Radio />}
              label="Aprovado com observações/Ressalvas"
            />
            <FormControlLabel
              value="3"
              control={<Radio />}
              label="Não aprovado/Inelegível"
            />
            <FormControlLabel
              value="4"
              control={<Radio />}
              label="Prejudicado/Arquivado"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
    </Grid>
  );
}
