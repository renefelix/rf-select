/**
 * ARQUIVO RESPONSÁVEL POR EXIBIR O TEXTO NO HEADER DO SELECT
 */

/**
 * Função responsável por fazer a contagem de quantas opções
 * estão selecionadas no elemento
 * @param {element} select 
 */
function contagemDeOptionsSelecionados(select){
    let contaSelecionados   = 0;
    
    Array.prototype.forEach.call(select.options, (opcao) => {
        if(opcao.hasAttribute('selected')){
            contaSelecionados++;
        }
    });
    
    return contaSelecionados;
}


/**
 * Função responsável por pegar o index da option selecionada
 * Utilizada apenas em selects que permitem apenas uma opção
 * @param {element} select 
 */
function indexOpcaoSelecionada(select){
    let indexOpcaoSelecionada = 0;

    /**
     * O array abaixo vai pegar o valor da última opção que esta selecioanda
     * e exibir o textContent do <option> caso não exista o d
     */
    Array.prototype.forEach.call(select.options, (opcao, index) => {
        if(opcao.hasAttribute('selected') === true){
            /**
             * Verifico se existe alguma opção selecionada
             * Caso exista, salva o index da última e se não
             * tiver nenhuma opção selecionada, o index será 0
             */
            indexOpcaoSelecionada = index;
        }
    });

    return indexOpcaoSelecionada;
}

/**
 * Função responsável por exibir o nome do select
 * @param {element} select 
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
             */
            placeholder = select.options[indexOpcaoSelecionada(select)].textContent;
        }
    }
    
    return placeholder;
}