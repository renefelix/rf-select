/**
 * Função responsável por criar a listagem de options de cada select
 */

 export default function criarListagemOptions(classSelect, indexSelect){
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
			let disabled = opcao.getAttribute('disabled');

			ulListagem[indexSelect].insertAdjacentHTML('beforeend', 
			`<li tabindex="0" class="rf-select-option rf-select-option-${indexSelect} ${disabled != null ? 'disabled' : ''} ${opcao.hasAttribute('selected') ? 'selected' : ''}" data-rf-select="${indexSelect}" data-rf-option="${i}" role="listitem">
				${textDoOption}
			</li>`);
		}
	}else{
		ulListagem[indexSelect].innerHTML = `<li class="rf-select-empty">Nenhum resultado</li>`;
	}

 }