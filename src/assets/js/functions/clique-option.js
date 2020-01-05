import triggerEvent from "./trigger";

export default function cliqueNaOpcao(classSelect){
    let opcoes = document.querySelectorAll('.rf-select-option');

    Array.prototype.forEach.call(opcoes, (opcao) => {
        opcao.addEventListener('click', () => {
            let indexDataSelect = opcao.getAttribute('data-rf-select');
            let indexDataOption = opcao.getAttribute('data-rf-option');
            
            let selectDOM = document.querySelectorAll(classSelect)[indexDataSelect];
            let optionDOM = selectDOM.options[indexDataOption];
            let rfOpcoes =	document.querySelectorAll(`[data-rf-select="${indexDataSelect}"]`);
            let headerSelect =	document.querySelectorAll('.rf-select-header')[indexDataSelect];

            let isMultiple = selectDOM.hasAttribute('multiple');

            if(isMultiple === true){

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