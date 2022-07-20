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

export default function ManifestacaoForm(): JSX.Element {
  const { process, setProcess } = useContext(DialogContext);

  //const [andamentoGPO, setAndamentoGPO] = useState('female');

  //const handleRadioButtonChange = (
  //  event: React.ChangeEvent<HTMLInputElement>
  //) => {
  //  setAndamentoGPO((event.target as HTMLInputElement).value);
  //};

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="caption" sx={{ fontSize: 24, color: '#1976d2' }}>
          Diretoria/SOG
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <FormTextField
          label="Manifestação da ANTAQ"
          value={process.DSEstadoManifestacaoANTAQ || ''}
          onChange={(e) =>
            setProcess({
              ...process,
              DSEstadoManifestacaoANTAQ: e.target.value,
            })
          }
          helperText="Diretoria/SOG"
        />
      </Grid>
      <Grid item xs={8}>
        <FormTextField
          label="Deliberação da Diretoria"
          fullWidth
          value={process.DSTituloAnaliseREIDI || ''}
          onChange={(e) =>
            setProcess({
              ...process,
              DSTituloAnaliseREIDI: e.target.value,
            })
          }
          helperText="e/ou declaração técnica SOG"
        />
      </Grid>
    </Grid>
  );
}
