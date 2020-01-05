/**
 * Função responsável por fechar todos os selects quando clica fora de um apenas
 */

export default function cliqueForaDoSelect(){
    window.addEventListener('click', function(e){   
		let geralSelects = document.querySelectorAll('.rf-select');
		let geralListagens = document.querySelectorAll('.rf-listagem');
		let contagem = 0;
		let headerSelect = document.querySelectorAll('.rf-select-header');

		Array.prototype.forEach.call(geralSelects, function(sel){
			if (!sel.contains(e.target)) {
                contagem++;
            }
		});
        
        if(contagem == geralSelects.length){
			Array.prototype.forEach.call(headerSelect, (header) => {
				if(header.classList.contains('opened')){
					header.classList.remove('opened');
				}
			});

            Array.prototype.forEach.call(geralListagens, function(lista, index){
				let ulListagem = lista.querySelector('.rf-ul-listagem');
				let selectBusca = lista.querySelector('.rf-select-input-busca');

				lista.classList.remove('show');
				ulListagem.innerHTML = "";
				selectBusca.value = "";
            });
		}
    });
}