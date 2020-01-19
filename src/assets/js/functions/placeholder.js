import {contagemDeOptionsSelecionados, indexOpcaoSelecionada} from "./conta-options-selecionados";

/**
 * ARQUIVO RESPONSÁVEL POR EXIBIR O TEXTO NO HEADER DO SELECT
 */

/**
 * Função responsável por exibir o nome do select
 * @param {element} select Elemnto select do DOM 
 */

 export default function placeholder(select){
     let placeholder;
     let isMultiple          = select.hasAttribute('multiple');
     let dataPlaceholder     = select.getAttribute('data-placeholder');
     let contaSelecionados   = contagemDeOptionsSelecionados(select);
     
    /**
     * Executa as condições quando o select for multiplo
     * Ou seja, podem ser selecionadas mais de uma opção
     */
    if(isMultiple === true){
        if(contaSelecionados > 1){
            /**
             * Caso possuam mais de uma opção selecionada
             * Será exibido a contagem da quantidade selecionada
             * seguida do texto "itens selecionados"
             */
            placeholder = `${contaSelecionados} itens selecionados`;
        }else if(contaSelecionados === 1){
            /**
             * Caso tenha apenas uma oção selecionada
             * vai exibir o textContent da options selecionada
             */
            placeholder = select.options[indexOpcaoSelecionada(select)].textContent;
        }else if(contaSelecionados <= 0){

            /**
             * Caso não tenha nenhuma opção selecionada
             * Verifica se foi declarado o data-placeholder no select
             */
            if(dataPlaceholder != null){
                /**
                 * Caso exista sim o data-placeholder
                 * exibe o valor que esta escrito nele
                 */
                placeholder = dataPlaceholder;
            }else{
                /**
                 * Caso não exista o data-placeholder
                 */
                placeholder = select.options[indexOpcaoSelecionada(select)].textContent;
            }
        }
    }

    /**
     * Executa as ações quando o select for single
     * Ou seja, pode apenas selecionar uma opção
     */
    else{
        /**
         * Verifica se existe o data-placeholder 
         */
        if(dataPlaceholder != null){
            if(contaSelecionados >= 1){
                placeholder = select.options[indexOpcaoSelecionada(select)].textContent
            }else{
                placeholder = dataPlaceholder;
            }
        }else{
            /**
             * Aplica o textContent da última opção selecionada
             * E caso não tenha nenhum opção no select, deixa em branco
             */
            if(select.options[indexOpcaoSelecionada(select)] !== undefined){
                placeholder = select.options[indexOpcaoSelecionada(select)].textContent;
            }else{
                placeholder = "";
            }
        }
    }
    
    return placeholder;
}