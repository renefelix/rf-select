import triggerEvent from "./trigger";
import { contagemDeOptionsSelecionados, indexOpcaoSelecionada } from "./conta-options-selecionados";
import placeholder from "./placeholder";

export default function cliqueNaOpcao(classSelect){
    let opcoes = document.querySelectorAll('.rf-select-option');

    Array.prototype.forEach.call(opcoes, (opcao, indexOpcao) => {
        opcao.addEventListener('click', () => {
            let indexDataSelect = opcao.getAttribute('data-rf-select');
            let indexDataOption = opcao.getAttribute('data-rf-option');
            
            let selectDOM = document.querySelectorAll(classSelect)[indexDataSelect];
            let optionDOM = selectDOM.options[indexDataOption];
            let rfOpcoes =	document.querySelectorAll(`li[data-rf-select="${indexDataSelect}"]`);
            let headerSelect =	document.querySelectorAll('.rf-select-header')[indexDataSelect];

            let isMultiple = selectDOM.hasAttribute('multiple');

            if(isMultiple === true){
                opcao.classList.toggle('selected');
                optionDOM.toggleAttribute('selected');

                if(contagemDeOptionsSelecionados(selectDOM) >= 2){
                    headerSelect.innerHTML = contagemDeOptionsSelecionados(selectDOM)+' itens selecionados';
                }else{
                    if(indexOpcaoSelecionada(selectDOM) === 0){
                        if(selectDOM.hasAttribute('data-placeholder') === true){
                            headerSelect.innerHTML = selectDOM.getAttribute('data-placeholder');
                        }else{
                            headerSelect.innerHTML = "";
                        }
                    }else{
                        headerSelect.innerHTML = rfOpcoes[indexOpcaoSelecionada(selectDOM)].textContent;
                    }
                }
            }else{
                // Change Placeholder de acordo com o texto da option clicada
                headerSelect.innerHTML = optionDOM.textContent;

                // Remove a class de selected de todas as opções 
                Array.prototype.forEach.call(rfOpcoes, (rfOpcao) => {
                    rfOpcao.classList.remove('selected');
                });

                // Adiciona a class selected apenas na opção clicada
                opcao.classList.add('selected');

                // Remove todo os selecteds das options do select que não é multiplo
                Array.prototype.forEach.call(selectDOM.options, (option) => {
                    option.removeAttribute('selected');
                });

                // Coloca o atributo selected no option clicado do RF Select
                optionDOM.setAttribute('selected','selected');
            }

            // Aciona o evento change no Select DOM
            triggerEvent(selectDOM, 'change');
        });
    })
}