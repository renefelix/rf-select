/**
 * Função para abrir a listagem do RF Select 
 * na direção que tiver mais espaço na tela
 */

export default function direcaoListagemUpDown(listagemRFSelect, indexSelect){
    let alturaWindow = window.innerHeight;
    
    let selectAtual = document.querySelectorAll('.rf-select')[indexSelect];
    let listagemAltura = listagemRFSelect[indexSelect].clientHeight;

    let espacoLivreY = selectAtual.getBoundingClientRect().top;
    let alturaSelect = selectAtual.getBoundingClientRect().height;

    let espacoLivreBottom = (alturaWindow - espacoLivreY) - alturaSelect;

    /**
     * Caso não tenha espaço na parte de baixo da tela
     * Exibe a listagem acima do Select
     */
    if(espacoLivreBottom <= listagemAltura){
        listagemRFSelect[indexSelect].style.top = "-"+listagemAltura+"px";
    }
    
    /**
     * Caso tenha espaço na parte de baixo da tela
     * Exibe a listagem abaixo do select
     */
    else{
        listagemRFSelect[indexSelect].style.top = alturaSelect-2+"px";
    }
}