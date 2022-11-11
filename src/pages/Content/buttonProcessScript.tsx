import React from 'react';
import ReactDOM, { render } from 'react-dom';
import AlertDialog from '../../components/Dialog';
import '../../styles/global.css';
import renderForm from './dialogScript';
import IconButton from '@mui/material/IconButton';

function sleep(delay = 0) {
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  };

// Incorpora a família de fontes Roboto
const addStylesheet = () => {
    const robotoFont: HTMLLinkElement = document.createElement('link');
    robotoFont.rel = 'stylesheet';
    robotoFont.href =
        'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap';
    document.head.appendChild(robotoFont);
};

const addButtons = () => {
    const divComandos = (document.getElementById('ifrVisualizacao')as HTMLIFrameElement).contentWindow.document.getElementById('divArvoreAcoes');
    const newDocButton = document.createElement('a');
    newDocButton.href = '#';
    newDocButton.tabIndex = 451;
    newDocButton.classList.add('botaoSEI');
    newDocButton.innerHTML = `<img src="imagens/sei_incluir_documento.gif" class="infraCorBarraSistema" title="Adicionar novo documento">`;
    const container = document.body.appendChild(document.createElement('div'));
    newDocButton.addEventListener('click', () =>
        render(<AlertDialog container={container} />, container)
    );

    divComandos.append(newDocButton);
};

const buttonsScript = async () => {
    addStylesheet();
    await sleep(1e3);
    addButtons();
    renderForm();
};

buttonsScript();