function triggerChange(elemento){
    var evento = new Event('change', { 'bubbles': true })
    elemento.dispatchEvent(evento);
}

/**
 * @param {element} select é o elemento select que receberá a estrutura
 * Essa função já esta dentro do looping principal na função rfselect();
 */
function estruturaMain(select, index){
    var disabled = select.getAttribute('disabled');

    var estruturaMain = `
        <div class="rf-select ${disabled != null ? 'disabled' : ''}" id="rf-select-${index}">
            <div class="rf-select-main rf-select-main-${index}"></div>

            <div class="rf-hidden-area">
                <div class="rf-input rf-hidden-input-${index}">
                    <input placeholder="Faça uma busca" type="text" class="rf-input" id="rf-input-${index}" data-input="${index}" />
                </div>
                <ul class="rf-select-list rf-select-list-${index}"></ul>
            </div>
        </div>`;
    
    select.insertAdjacentHTML('beforebegin', estruturaMain);
    addOptions(select, index);
}


/**
 * @param {element} select é o elmento do select que vai receber montar a estrutura das opções
 */
function addOptions(select, index){
    var listagem = document.querySelector(`.rf-select-list-${index}`);

    /**
     * Limpa a lista do select para que não haja multiplicação dos conteúdos
     */
    listagem.innerHTML = "";

    /**
     * Monta as opções de cada select
     */

     Array.prototype.forEach.call(select, (options, index) => {
        var text = options.text;
        var value = options.value;
        var disabled = options.getAttribute('disabled');


        var criarOption = document.createElement('li');
        
        /**
         * Insere os atributos que tem no select principal na <li>
         */
        criarOption.setAttribute('value', value);
        criarOption.textContent = text;

        if(disabled != null){
            criarOption.classList.add('disabled');
        }

        listagem.appendChild(criarOption);
     });
}

/**
 * Esconde todos os selects que possuem a classe e adiciona o atributo que identifica cada select
 * Essa função já esta dentro do looping principal na função rfselect();
 * @param {element} select é o elemento que vai receber as ações
 */
function initSelect(select, index){
    select.setAttribute('hidden','hidden');
    select.setAttribute('data-rf-select', index);
}

/**
 * Função final que deve ser chamada para executar o select 
 * @param {string} classSelect nome da class do select que vai recber o select fake
 * @param {*} callback callback function que será executada sempre que o select sofrer alguma alteração
 */
var rfselect = (classSelect, callback = false) => {
    triggerChange(document.body);
    var selectMain =  document.querySelectorAll(classSelect);
    
    /**
     * Verifica se quando carregar o plugin, se o rf-select já não esta aplicado
     * Se não tiver o RF select, ele vai adicionar, isso evita duplicidade dos elementos
     */
    Array.prototype.forEach.call(selectMain, (select, index) => {

        var elementoIrmao = select.nextElementSibling;

        if(elementoIrmao.classList.contains('rf-select') === false){
            initSelect(select, index);
            estruturaMain(select, index);
        }
    });

    /**
     * Execução do callback quando o documento for alterado
     */
    document.body.addEventListener('change', () => {
        callback();
    });
}

rfselect(".select");


document.getElementById('click').addEventListener('click', () => {

    var corpo = document.getElementById("canvas");
    var elemento = document.createElement('select');
        elemento.classList.add('select');
        corpo.appendChild(elemento);

        rfselect(".select");
});