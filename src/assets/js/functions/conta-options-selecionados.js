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

export {indexOpcaoSelecionada, contagemDeOptionsSelecionados}