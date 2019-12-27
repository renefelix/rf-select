// Função para abrir a listagem para cima ou para baixo

let alturaWindow = window.innerHeight;
let listagemAltura = dktListagensSelect[index].clientHeight;
let espacoLivreY = selectAtual.getBoundingClientRect().top;
let alturaSelect = selectAtual.getBoundingClientRect().height;

let espacoLivreBottom = (alturaWindow - espacoLivreY) - alturaSelect;

if(espacoLivreBottom <= listagemAltura){
	selectAtual.classList.toggle('expanded-up');
	dktListagensSelect[index].style.top = "-"+listagemAltura+"px";
}else{
	selectAtual.classList.toggle('expanded-down');
	dktListagensSelect[index].style.top = alturaSelect+"px";
}