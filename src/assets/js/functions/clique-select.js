import criarListagemOptions from "./listagem-options";
import direcaoListagemUpDown from "./direcao-listagem";

/**
 * Essa função é responsável por controlar todas as ações acionadas
 * quando o usuário clicar no RF-Select
 */

export default function cliqueNoSelect(classSelect){
    let todosOsSelects = document.querySelectorAll('.rf-select-header');
    let listagemRFSelect = document.querySelectorAll('.rf-listagem');

    Array.prototype.forEach.call(todosOsSelects, (select, indexSelect) => {
        select.addEventListener('click', () => {

            // Antes de abrir a listagem do select referente, fecha todos que tiverem abertos
            Array.prototype.forEach.call(listagemRFSelect, (listagem, indexListagem) => {
                if(indexListagem != indexSelect){
                    listagem.classList.remove('show');
                }
            });

            // Função para criar todas as opções iguais do select
            criarListagemOptions(classSelect, indexSelect);

            // Adiciona a class show para poder abrir a listagem do RF Select clicado
            listagemRFSelect[indexSelect].classList.toggle('show');

            // Função que direciona se a lista vai abrir para cima ou para baixo
            direcaoListagemUpDown(listagemRFSelect, indexSelect);
        });
    })
}