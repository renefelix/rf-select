/**
 * Essa função é responsável por atualizar a altura da listagem
 * Caso ela esteja aberta para cima e o usuário utilize o campo
 * de fazer alguma busca no select
 */
function direcaoComAlturaDinamica(){
    let camposDeBusca = document.querySelectorAll('.rf-select-input-busca');

    Array.prototype.forEach.call(camposDeBusca, (busca) => {
        busca.addEventListener('keyup', () => {
            let listaReferente = document.querySelector('.rf-listagem.show');
    
            if(listaReferente.classList.contains('up')){
                listaReferente.style.top = "-"+listaReferente.clientHeight+"px";
            }
        })
    })
}

export {direcaoComAlturaDinamica}