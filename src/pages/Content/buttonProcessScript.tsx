import React from 'react';
import ReactDOM, { render } from 'react-dom';
import AlertDialog from '../../components/Dialog';
import '../../styles/global.css';
import renderForm from './dialogScript';
import IconButton from '@mui/material/IconButton';
import { matchRows } from '../../services/utils';


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

const addButtons = async () => {

    const processNumber = (document.getElementById('ifrArvore')as HTMLIFrameElement).contentWindow.document.getElementById('topmenu').getElementsByTagName('span')[0].innerHTML.substring(0,20);
    const idProcedimento = (document.getElementById('ifrArvore')as HTMLIFrameElement).contentWindow.document.getElementById('topmenu').getElementsByTagName('span')[0].id.substring(4);

    const reidiProcessesNumber = await matchRows([processNumber]);

    const divComandos = (document.getElementById('ifrVisualizacao')as HTMLIFrameElement).contentWindow.document.getElementById('divArvoreAcoes');
    const newDocButton = document.createElement('a');
    newDocButton.setAttribute("class", "buttonProcess")

    if(divComandos.getElementsByClassName("buttonProcess").length != 0){
      const buttonList = divComandos.getElementsByClassName("buttonProcess")
      for(let i = 0; i <= buttonList.length; i++){
        divComandos.removeChild(buttonList[i])
      }
    }
    newDocButton.href = '#';
    newDocButton.tabIndex = 451;
    newDocButton.classList.add('botaoSEI');

    if(reidiProcessesNumber[0] != undefined){
        newDocButton.innerHTML = `<img src="imagens/sei_assinar.gif" class="infraCorBarraSistema" title="Editar controle ">`;
        newDocButton.addEventListener('click', () =>
        chrome.runtime.sendMessage({
            action: 'showREIDIDialog',
            type: 'edit',
            idProcedimento: idProcedimento,
            numeroProcesso: processNumber,
          })
    );
    }
    else{
        newDocButton.innerHTML = `<img src="imagens/sei_documento_gerar_multiplo.gif" class="infraCorBarraSistema" title="Adicionar controle ">`;
        newDocButton.addEventListener('click', () =>
        chrome.runtime.sendMessage({
            action: 'showREIDIDialog',
            type: 'create',
            idProcedimento: idProcedimento,
            numeroProcesso: processNumber,
          })
    );

    }
    
    divComandos.append(newDocButton);
};

const buttonsScript = async () => {
    addStylesheet();
    await sleep(1e3);
    addButtons();
    renderForm();
};

buttonsScript();

  chrome.runtime.onMessage.addListener((request) => {
    if (request.action === 'reloadREIDI') {
      addButtons();
    }
  });