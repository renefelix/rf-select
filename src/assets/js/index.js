import '../scss/index.scss';
import estruturaPrincipal from './functions/estrutura';
import placeholder from './functions/placeholder';
import cliqueNoSelect from './functions/clique-select';

/**
 * Estrutura principal do select
 * @param {string} classSelect nome da classe do elemento que vai ser estilizada
 * @param {Array} args Array de argumentos para personalização do select
 */
function rfSelect(classSelect, args = false){
    let selects = document.querySelectorAll(classSelect);

    Array.prototype.forEach.call(selects, (select, indexSelect) => {
        /**
         * Esconde todos os selects
         */
        select.setAttribute('hidden','hidden');

        /**
         * Pega todos os selects e cria a estrutura inicial do HMTL
         * antes de iniciar a TAG
         */
        select.insertAdjacentHTML('beforebegin', estruturaPrincipal(
            placeholder(select),
            indexSelect
        ));
    });

    cliqueNoSelect(classSelect);
}


rfSelect('.select');