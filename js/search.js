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
const search = (field, elementList, idMensagem = false, callback) => {
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

/**
 * Essa função é responsável pela busca no detalhe pedido
 * Foi necessário criar um padrão para busca porque ela funciona diferente do padrão
 * @param {*} idCampoBusca 
 * @param {*} classListagem 
 * @param {*} idConteudoNenhumaSocilicitacao 
 */
function searchDetalhe(idCampoBusca, classListagem, idConteudoNenhumaSocilicitacao){
    let inputFilter = document.getElementById(idCampoBusca);

    if(inputFilter){
        inputFilter.addEventListener('keyup', () => {
            let list = document.querySelectorAll(classListagem);
            let valorDigitado = inputFilter.value;

            if(valorDigitado.length >= 0){
                for(let listaItem of list){
                    let conta = 0;
                    let idConteudo = listaItem.getAttribute('id');
                    let abaColuna = document.querySelector('[data-js-filtro-div-id="'+idConteudo+'"]');
                    
                    /**
                     * Resultado final se exibe o elemento
                     */

                     if(contagemItens(conta, listaItem, valorDigitado) >= 1){
                        abaColuna.classList.remove('hide');
                        // abaColuna.classList.add('show');
                    }else{
                        // abaColuna.classList.remove('show');
                        abaColuna.classList.add('hide');
                    }                    

                    conta = 0;
                    abaColuna.classList.remove('active');
                }


                /**
                 * Exbie mensagem de nenhuma solicitação
                 */

                 let contaSolicitacoes = document.querySelectorAll('.js-item-filtro-solicitacao:not(.hide)').length;

                 if(contaSolicitacoes <= 0){
                     document.getElementById('tab__vertical-solicitacoes').classList.remove('fixed');
                     document.getElementById(idConteudoNenhumaSocilicitacao).classList.remove('d-none');
                 }else{
                    document.getElementById(idConteudoNenhumaSocilicitacao).classList.add('d-none');
                 }


                /**
                 * Removo todos os conteúdos de acordo com a busca
                 */
                let allConteudos = document.querySelectorAll('.js-conteudo-solicitacao');

                Array.prototype.forEach.call(allConteudos, (conteudo) => {
                    conteudo.classList.remove('show');
                    conteudo.classList.remove('active');
                });

                /**
                 * Primeira Aba
                 */
                let primeiraAba = document.querySelector('.js-item-filtro-solicitacao:not(.hide)');
                
                if(primeiraAba){
                    let hrefPrimeiraAba = primeiraAba.getAttribute('data-js-filtro-div-id');
                    let primeiroConteudo = document.getElementById(hrefPrimeiraAba);
                    
                    primeiraAba.classList.add('active');
                    primeiroConteudo.classList.add('show');
                    primeiroConteudo.classList.add('active')
                }
            }
        });
    }
}


/**
 * Busca do step 3 do formulário de busca
 */

 function searchFormularioAplha(idCampoBusca, classListagem, idMensagem){
    let inputFilter = document.getElementById(idCampoBusca);

    if(inputFilter){
        inputFilter.addEventListener('keyup', () => {
            let list = document.querySelectorAll(classListagem);
            let valorDigitado = inputFilter.value;

            if(valorDigitado.length >= 0){
                
                /**
                 * Função que faz a busca básica dos documentos
                 */
                Array.prototype.forEach.call(list, (listaItem, index) => {
                
                    let conta = 0;
                    let idDocumentoKit = listaItem.getAttribute('data-documento-kit');
                    let documentosKit = document.querySelectorAll('.js-documento-kit-'+idDocumentoKit);
                    let checkboxRelacionado = document.querySelector('.js-checkbox-'+idDocumentoKit);
                    // let fakeCheckboxRelacionado = document.querySelector('.js-fake-checkbox-'+idDocumentoKit);
                    // let linhaDocumento = document.querySelector('.js-checkbox-doc-'+idDocumentoKit);

                    // console.log(linhaDocumento);

                    // disabled-outrasTitularidades

                    /**
                     * Resultado final se exibe o elemento
                     */
                    if(contagemItens(conta, listaItem, valorDigitado) >= 1){
                        Array.prototype.forEach.call(documentosKit, (documentoKit) => {
                            if(!documentoKit.classList.contains('d-none')){
                                documentoKit.classList.remove('hide');
                            }
                        });

                        if(checkboxRelacionado){
                            checkboxRelacionado.classList.remove('disabled-outrasTitularidades');
                        }
                    }else{
                        Array.prototype.forEach.call(documentosKit, (documentoKit) => {
                            if(!documentoKit.classList.contains('d-none')){
                                documentoKit.classList.add('hide');
                            }
                        });

                        if(checkboxRelacionado){
                            
                            checkboxRelacionado.classList.add('disabled-outrasTitularidades');
                        }
                    }

                    conta = 0;
                });


                /**
                 * Função que esconde os kits caso não tenha nenhum documento
                 * que bata com o resultado da busca digitada
                 */
                let allKits = document.querySelectorAll('.js-kits');

                Array.prototype.forEach.call(allKits, (kit) => {
                    let contaDocsNoKit = kit.querySelectorAll('.js-ul-kit:not(.hide):not(.d-none)').length;

                    if(contaDocsNoKit <= 0){
                        kit.classList.add('hide');
                    }else{
                        kit.classList.remove('hide');
                    }
                });
                

                /**
                 * Funlão que faz a contagem de resultados encontrados
                 * se não tiver nenhum item para ser exibido ele mostra 
                 * a mensagem de erro 
                 */
                let allKitsHidden = document.querySelectorAll('.js-kits:not(.hide)').length;
                let mensagem = document.getElementById(idMensagem);

                if(allKitsHidden <= 0){
                    mensagem.classList.remove('d-none');
                }else{
                    mensagem.classList.add('d-none');
                }
            }
        });
    }
 }

export { search, searchDetalhe, searchFormularioAplha }