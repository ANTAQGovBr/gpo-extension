import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
} from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import React from 'react';
import { unmountComponentAtNode } from 'react-dom';

interface AlertDialogProps {
  container: Element;
}

export default function AlertDialog({ container }: AlertDialogProps) {
  const [open, setOpen] = React.useState(true);
  const [type, setType] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value as string);
  };

  const handleClose = () => {
    setOpen(false);
    unmountComponentAtNode(container);
  };

  const handleSelect = () => {
    switch (type) {
      case 'REIDI':
        chrome.runtime.sendMessage({
          action: 'showREIDIDialog',
          type: 'create',
        });
        break;
      case 'Leilões':
        chrome.runtime.sendMessage({
          action: 'showAuctionDialog',
        });
        break;
      default:
        break;
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Controle Finalístico</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Selecione abaixo qual tipo de controle deseja criar.
        </DialogContentText>
        <Box sx={{ margin: 5 }}>
          <FormControl fullWidth>
            <InputLabel id="select-label">Controle</InputLabel>
            <Select
              value={type}
              label="Controle"
              onChange={handleChange}
              labelId="select-label"
              fullWidth
            >
              <MenuItem value="REIDI">REIDI</MenuItem>
              <MenuItem value="Leilões">Leilões</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>CANCELAR</Button>
        <Button onClick={handleSelect}>SELECIONAR</Button>
      </DialogActions>
    </Dialog>
  );
}
