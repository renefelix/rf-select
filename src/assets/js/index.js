import '../scss/index.scss';
import estruturaPrincipal from './functions/estrutura';
import placeholder from './functions/placeholder';
import cliqueNoSelect from './functions/clique-select';
import cliqueForaDoSelect from './functions/clique-fora';
import { search } from './functions/busca';

function montagemDoSelect(select, indexSelect){
    /**
     * Verifica se o select já esta aplicado para atualizar o dkt-select
     * quando o for chamado novamente a função e não duplicar
     */
    let rfSelectSibling = select.previousElementSibling;

    if(rfSelectSibling != null){
        if(rfSelectSibling.classList.contains('rf-select') === true){
            rfSelectSibling.remove();
        }
    }

    /**
     * Esconde todos os selects
     */
    select.setAttribute('hidden','hidden');

    /**
     * Verifica se o select é disabled
     */

    let selectDesativado = select.hasAttribute('disabled');

    /**
     * Pega todos os selects e cria a estrutura inicial do HMTL
     * antes de iniciar a TAG
     */
    select.insertAdjacentHTML('beforebegin', estruturaPrincipal(
        placeholder(select),
        indexSelect,
        selectDesativado
    ));
}

/**
 * Estrutura principal do select
 * @param {string} classSelect nome da classe do elemento que vai ser estilizada
 * @param {Array} args Array de argumentos para personalização do select
 */
function rfSelect(classSelect, args = false){
    let selects = document.querySelectorAll(classSelect);

    Array.prototype.forEach.call(selects, (select, indexSelect) => {
        montagemDoSelect(select, indexSelect);
        search('rf-select-buscar-'+indexSelect, 'li[data-rf-select="'+indexSelect+'"]');
    });

    cliqueNoSelect(classSelect);
    cliqueForaDoSelect();
}


rfSelect('.select');