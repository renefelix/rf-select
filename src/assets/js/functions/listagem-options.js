import { contagemDeOptionsSelecionados, indexOpcaoSelecionada } from "./conta-options-selecionados";

/**
 * Função responsável por criar a listagem de options de cada select
 */

 export default function criarListagemOptions(classSelect, indexSelect, disabled){
     let selectDOMReferente = document.querySelectorAll(classSelect)[indexSelect];
     let ulListagem = document.querySelectorAll('.rf-ul-listagem');

     /**
      * Sempre que for criar a listagem de opções
      * É importante zerar a que foi criada anteriormente
      * para que não problemas caso o select for atualizado via Ajax
      */
     ulListagem[indexSelect].innerHTML = "";

     /**
      * Verifica se o select do DOM possui pelo menos uma opção
      */
     if(selectDOMReferente.length >= 1){
        
        for(let i = 0; i < selectDOMReferente.length; i++){

            let opcao = selectDOMReferente.options[i];
			let textDoOption = opcao.text;
			let disabled = opcao.hasAttribute('disabled');

            ulListagem[indexSelect].insertAdjacentHTML('beforeend', 
            `<li tabindex="0" class="rf-select-option rf-select-option-${indexSelect} ${disabled === true ? 'disabled' : ''} ${opcao.hasAttribute('selected') ? 'selected' : ''}" data-rf-select="${indexSelect}" data-rf-option="${i}" role="listitem">
                ${textDoOption}
            </li>`);
		}
	}else{
		ulListagem[indexSelect].innerHTML = `<li class="rf-select-empty">Nenhum resultado</li>`;
    }

    /**
     * Função que verifica se o select não é multiplo mas possui
     * mais de uma option selecionada, porque se tiver, marca apenas
     * a ultima opcao do RF Select como selecionada
     */
    if(selectDOMReferente.hasAttribute('multiple') === false){
        if(contagemDeOptionsSelecionados(selectDOMReferente) >= 2){

            let rfOpcoes = document.querySelectorAll(`li[data-rf-select="${indexSelect}"]`);

            // Remove a class de selected de todas as opções 
            Array.prototype.forEach.call(rfOpcoes, (rfOpcao) => {
                rfOpcao.classList.remove('selected');
            });

            // Adiciona a class selected apenas na opção clicada
            rfOpcoes[indexOpcaoSelecionada(selectDOMReferente)].classList.add('selected');
        }
    }
 }