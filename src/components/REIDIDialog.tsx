import { DialogContext } from '../contexts/dialogContext';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import InboxIcon from '@mui/icons-material/Inbox';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/material';
import React, { useContext, useState } from 'react';
import { unmountComponentAtNode } from 'react-dom';
import Tabs from './Tabs';

interface ConfirmDeleteDialogProps {
  handleCloseConfirmDeleteDialog: () => void;
  handleCloseREIDIDialog: () => void;
  handleDeleteProcess: (callback: any) => Promise<void>;
  isOpen: boolean;
}

interface DialogProps {
  title: string;
  onClick: (callback) => void;
  actionText: string;
  isLoading: boolean;
  container: Element;
  isOpen: boolean;
  idProcedimento: string;
  numeroProcesso: string;
  handleDeleteProcess?: (callback) => void;
  type: string;
}

export function ConfirmDeleteDialog({
  isOpen,
  handleDeleteProcess,
  handleCloseREIDIDialog,
  handleCloseConfirmDeleteDialog,
}: ConfirmDeleteDialogProps): JSX.Element {
  return (
    <Dialog
      id="delete-dialog"
      open={isOpen}
      onClose={handleCloseConfirmDeleteDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Tem certeza que deseja deletar este processo?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Esse processo é irreversível.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseConfirmDeleteDialog}>Cancelar</Button>
        <Button
          onClick={() => {
            handleCloseConfirmDeleteDialog();
            handleDeleteProcess(handleCloseREIDIDialog);
          }}
          color="error"
        >
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default function REIDIDialog({
  title,
  onClick,
  actionText,
  isLoading,
  isOpen,
  container,
  idProcedimento,
  numeroProcesso,
  handleDeleteProcess,
  type,
}: DialogProps): JSX.Element {
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const {process, setProcess} = useContext(DialogContext);

  const handleConfirmDelete = () => {
    setDeleteDialogOpen(true);
  };

  // Desmonta o componente ao fechar o modal
  const handleCloseREIDIDialog = () => {
    unmountComponentAtNode(container);
  };

  const handleCloseConfirmDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleCloseREIDIDialog}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>
        {title}
        <Button
          href={`https://sei.antaq.gov.br/sei/controlador.php?acao=procedimento_trabalhar&id_procedimento=${idProcedimento}`}
          target="_blank"
        >
          <Typography variant="h6" color="#1976d2">
            {numeroProcesso}
          </Typography>
        </Button>
      </DialogTitle>
      <DialogContent>
        <Stack direction="row" spacing={2}>
          <Button
            href={`https://sei.antaq.gov.br/sei/controlador.php?acao=procedimento_trabalhar&id_procedimento=${idProcedimento}`}
            target="_blank"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <FolderOpenIcon />
            Processo SEI
          </Button>
          <Button
            href={`https://sei.antaq.gov.br/sei/controlador.php?acao=procedimento_trabalhar&id_procedimento=${idProcedimento}&id_documento=${process.IDAnaliseREIDIDocumentoSEI}`}
            target="_blank"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <InboxIcon />
            Análise
          </Button>
          <Button
            href={`https://sei.antaq.gov.br/sei/controlador.php?acao=procedimento_trabalhar&id_procedimento=${idProcedimento}&id_documento=${process.IDManifestacaoANTAQDocumentoSEI}`}
            target="_blank"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}

          >
            <InboxIcon />
            Manifestação
          </Button>
        </Stack>
        <Divider />
        {isLoading ? <LinearProgress /> : null}
        <Tabs />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseREIDIDialog}>CANCELAR</Button>
        <Button onClick={() => onClick(handleCloseREIDIDialog)}>
          {actionText}
        </Button>
        {type === 'edit' ? (
          <Button onClick={() => handleConfirmDelete()} color="error">
            EXCLUIR
          </Button>
        ) : null}
      </DialogActions>
      <ConfirmDeleteDialog
        isOpen={isDeleteDialogOpen}
        container={container}
        handleDeleteProcess={handleDeleteProcess}
        handleCloseREIDIDialog={handleCloseREIDIDialog}
        handleCloseConfirmDeleteDialog={handleCloseConfirmDeleteDialog}
      />
    </Dialog>
  );
}
