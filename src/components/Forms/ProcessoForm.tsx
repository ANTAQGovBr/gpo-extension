import { Grid } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { DialogContext } from '../../contexts/dialogContext';
import FormDatePicker from '../FormDatePicker';
import FormTextField from '../FormTextField';

export default function ProcessoForm() {
  const { process, setProcess } = useContext(DialogContext);

  const [isDisabled, setDisabled] = useState(true); 
  const [isOpen, setOpen] = useState(true);


  useEffect(() => {
    if(process.NRProcessoPrincipal == null) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [isOpen]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={4}>
        <FormTextField
          label="Número do Processo SEI"
          value={process.NRProcessoPrincipal || ''}
          disabled={isDisabled}
          onChange={(e) =>
            setProcess({
              ...process,
              NRProcessoPrincipal: e.target.value,
            })
          }
        />
      </Grid>
      <Grid item xs={4}>
        <FormTextField
          label="Protocolo MInfra"
          value={process.NRProtocoloMINFRA || ''}
          onChange={(e) =>
            setProcess({
              ...process,
              NRProtocoloMINFRA: e.target.value,
            })
          }
        />
      </Grid>
      <Grid item xs={4}>
        <FormTextField
          label="Código MInfra"
          value={process.NRCodigoMINFRA || ''}
          onChange={(e) =>
            setProcess({
              ...process,
              NRCodigoMINFRA: e.target.value,
            })
          }
        />
      </Grid>
      <Grid item xs={8}>
        <FormTextField
          label="Observação e situação"
          multiline
          value={process.DSObservacoesSituacao || ''}
          onChange={(e) =>
            setProcess({
              ...process,
              DSObservacoesSituacao: e.target.value,
            })
          }
        />
      </Grid>
      <Grid item xs={4}>
        <FormDatePicker
          label="Data de Protocolo do Pedido"
          value={process.DTProtocoloPedido || null}
          onChange={(newValue) =>
            setProcess({
              ...process,
              DTProtocoloPedido: newValue,
            })
          }
        />
      </Grid>
    </Grid>
  );
}
