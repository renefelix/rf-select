function mostrarElementoLista(element) {
    element.classList.add("hide");    

    /**
     * Função para desabilitar os checkboxes dos itens escondidos
     * Mas só se a lista tiver Checkbox
     */
    let checkboxDisable = element.querySelectorAll('input[type=checkbox]');

    Array.prototype.forEach.call(checkboxDisable, (check) => {
        check.setAttribute('disabled', 'disabled');
    });
}

function retirarElementoLista(element) {
    element.classList.remove("hide");

    /**
     * Função para desabilitar os checkboxes dos itens escondidos
     * Mas só se a lista tiver Checkbox
     */
    let checkboxDisable = element.querySelectorAll('input[type=checkbox]');

    Array.prototype.forEach.call(checkboxDisable, (check) => {
        check.removeAttribute('disabled', 'disabled');
    });
}

function removerAcentosString(string) {
    return string.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
}

function contagemItens(conta, itemList, typed){
    /**
     * Contagem das palavras com acentros
     */
    itemList.textContent.indexOf(typed) >= 0 ? conta++ : '';

    /**
     * Contagem de letras minúsculas
     */

    let textLowerCase =  itemList.textContent;
        textLowerCase = textLowerCase.toLowerCase();
    let typedLowerCase = typed.toLowerCase();
    
    textLowerCase.includes(typedLowerCase) ? conta++ : '';

    /**
     * Contagem sem acentos
     */

    let textoSemAcento = removerAcentosString(itemList.textContent);
        textoSemAcento = textoSemAcento.toLowerCase();
    let typedSemAcento = removerAcentosString(typed);
        typedSemAcento = typedSemAcento.toLowerCase();
    
    textoSemAcento.indexOf(typedSemAcento) >= 0 ? conta++ : '';

    return conta;
}

/**
 * @param {string} field ID do input que é digitado a busca
 * @param {string} elementList Class da listagem que deve ser buscada
 * @param {string} idMensagem Id do campo que vai aparecer quando não tiver nenhum resultado na busca / False porque não é obrigatório
 */
const search = (field, elementList, idMensagem = false) => {
    let inputFilter = document.getElementById(field);


    if(inputFilter){
        inputFilter.addEventListener("keyup", function() {
            const list = document.querySelectorAll(elementList);
        
            if (this.value.length >= 0) {
                for (let itemList of list) {
                    let typed = this.value;
                    let conta = 0;

                    /**
                     * Resultado final se exibe o elemento
                     */
                    contagemItens(conta, itemList, typed) >= 1 ? retirarElementoLista(itemList) : mostrarElementoLista(itemList);

                    /**
                     * Zera contagem para o próximo elemento
                     */
                    conta = 0;

                    /**
                     * Conta quantos elementos estão listados
                     * para caso não haja nenhum, exibir div com informaçao de nada encontrado
                     * A DIV que possui a mensagem de nada encontrado deve estar escondida com a class 'd-none'
                     */
                    let contaLinhas = document.querySelectorAll(elementList+':not(.hide)').length;
                    
                    if(idMensagem != false){
                        let mensagemNotFound = document.getElementById(idMensagem);

                        if(contaLinhas <= 0){
                            mensagemNotFound.classList.remove('d-none');
                        }else{
                            mensagemNotFound.classList.add('d-none');
                        }
                    }
                }
        
            } else {
        
                for (let itemList of list) {
                    itemList.classList.remove("remove");
                }
            }
        });
    }
}

export {search}