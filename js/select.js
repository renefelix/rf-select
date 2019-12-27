import { search } from "../../commons/search";
import { triggerEvent } from "../../commons/triggerEvent";

/**
 * Estrutura inicial do Select que é montada quando o javaScript identifica que será usado
 * @param {String} placeholder Texto do placeholder do select
 * @param {Number} indexSelect Número do select que esta sendo alterado
 * @param {String} size Class com o tamanho do select 'small' ou 'bigger'
 * @param {Boolean} multiple Valor que indica se o select é multiplo
 */
function estruturaPrincipal(placeholder, indexSelect, size, multiple, hasIcon, disabled, footer, active, idLimpar, idAplicar, classLimpar, classAplicar, type){
	return `<div class="dkt-select ${active == true ? type == 'filter' ? 'active' : '' : ''} ${disabled === true ? 'dkt-select--disabled' : ''} ${size == 'bigger' ? 'dkt-bigger' : (size == 'small' ? 'dkt-small' : '')} ${type == 'select' ? 'dkt-type-select' : 'dkt-type-filter'}" tabindex="0">
		<div class="dkt-select-header ${hasIcon === true ? 'dkt-select-header-icone' : ''} ${multiple === true ? 'dkt-select-header-multiple' : ''}">
			${placeholder}
		</div>
		
		<div class="dkt-listagem">
			<div class="dkt-select-busca">
				<input class="dkt-select-input-busca" type="text" value="" placeholder="Buscar" id="dkt-select-buscar-${indexSelect}" data-dkt-select="${indexSelect}" />
			</div>

			<div class="dkt-scroll">
				<ul class="dkt-ul-listagem" role="list"></ul>
			</div>

			${footer === true ? 
				`${multiple == true ? 
					`<div class="dkt-select-acoes">
						<button id="${idLimpar != false ? idLimpar : ''}" type="button" class="dkt-btn-limpar btn__ghost btn--default ${classLimpar != false ? classLimpar : ''}" data-limpa-select="${indexSelect}">Limpar</button>
						<button id="${idAplicar != false ? idAplicar : ''}" type="submit" class="btn__ghost btn--default ${classAplicar != false ? classAplicar : ''}">Aplicar</button>
					</div>` : ''
				}` : ''
			}
		</div>
	</div>`;
}

function clickNoSelect(classSelect){
	let dktHeaderSelect = document.querySelectorAll('.dkt-select-header');

	Array.prototype.forEach.call(dktHeaderSelect, (headerSelect, index) => {
		headerSelect.addEventListener('click', function(){
			let isMultiple = headerSelect.classList.contains('dkt-select-header-multiple');
			let dktListagensSelect = document.querySelectorAll('.dkt-listagem');

			/**
			 * Fecha todos os outros filtros que tiverem abertos
			 */

			Array.prototype.forEach.call(dktListagensSelect, (lista, indexLista) => {
				if(indexLista != index){
					lista.classList.remove('show');
				}
			 });

			/**
			 * Abre ou fecha a listagem referente ao select clicado
			 */
			dktListagensSelect[index].classList.toggle('show');
			headerSelect.classList.toggle('opened');

			criarListagemDeOpcoes(classSelect, index, isMultiple);
			cliqueNaOpcaoDoSelect(classSelect, isMultiple);


			let inputBusca = dktListagensSelect[index].querySelector('input[type="text"]');
			inputBusca.focus();
		});

	});

	keypressSetas();
}

function keypressSetas(){
	let proximaOpcao = 0;
	let buscar = false;
	
	window.addEventListener('keydown', (e) => {
		let idSelect = e.target.getAttribute('data-dkt-select');

		if(idSelect !== null){

			let listagemAtual = document.querySelectorAll('.dkt-ul-listagem')[idSelect];
			let opcoesDoSelect = listagemAtual.querySelectorAll('.dkt-select-option:not(.hide)');
			let ultimaopcao = parseInt(opcoesDoSelect.length) - 1;
			let campoBusca = document.querySelectorAll('.dkt-select-input-busca');

			if(e.keyCode === 40){
				e.preventDefault();
				
				if(e.target.classList.contains('dkt-select-input-busca')){
					opcoesDoSelect[0].focus();
					proximaOpcao = 0;
				}
	
				if(e.target.classList.contains('dkt-select-option')){
	
					if(proximaOpcao >= ultimaopcao){
						proximaOpcao = ultimaopcao;
					}else{
						proximaOpcao = proximaOpcao + 1;
					}
	
					opcoesDoSelect[proximaOpcao].focus();
				}
			}else if(e.keyCode === 38){
				if(e.target.classList.contains('dkt-select-option')){
		
					if(proximaOpcao === 0){
						buscar = true;
					}else if(proximaOpcao <= 1){
						proximaOpcao = 0;
						buscar = false;
					}else{
						proximaOpcao = proximaOpcao - 1;
						buscar = false;
					}

					if(buscar === true){
						campoBusca[idSelect].focus();
					}else{
						opcoesDoSelect[proximaOpcao].focus();
					}
				}
			}
		}
	});
}

/**
 * Montar a lista de options de acordo com o select atual do DOM
**/
function criarListagemDeOpcoes(classSelect, index, isMultiple){
	let selectDOM = document.querySelectorAll(classSelect)[index];
	let ulListagem = document.querySelectorAll('.dkt-ul-listagem');

	ulListagem[index].innerHTML = "";


	if(selectDOM.length >= 1){
		for(let i = 0; i < selectDOM.length; i++){
			let opcao = selectDOM.options[i];
			let textDoOption = opcao.text;
			let disabled = opcao.getAttribute('disabled');

			ulListagem[index].insertAdjacentHTML('beforeend', 
			`<li tabindex="0" class="dkt-select-option dkt-select-option-${index} ${disabled != null ? 'disabled' : ''} ${opcao.hasAttribute('selected') ? 'selected' : ''}" data-dkt-select="${index}" data-dkt-option="${i}" role="listitem">
				${isMultiple === true ? `<input type="checkbox" data-dkt-input-select="${index}" ${opcao.hasAttribute('selected') ? 'checked="checked"' : ''}" tabIndex="-1" />` : ''}
				${textDoOption}
			</li>`);
		}
	}else{
		ulListagem[index].innerHTML = `<li class="dkt-select-empty">Nenhum resultado</li>`;
	}

	botaoLimpar(index);
}


function cliqueNaOpcaoDoSelect(classSelect, isMultiple){
	let dktOptions = document.querySelectorAll('.dkt-select-option');

	Array.prototype.forEach.call(dktOptions, (dktOption) => {
		dktOption.addEventListener('click', () => {
			let indexDataSelect = dktOption.getAttribute('data-dkt-select');
			let indexDataOption = dktOption.getAttribute('data-dkt-option');

			let selectDkt =	document.querySelectorAll('.dkt-select')[indexDataSelect];
			let headerSelect =	document.querySelectorAll('.dkt-select-header')[indexDataSelect];
			let listaSelect = document.querySelectorAll('.dkt-listagem')[indexDataSelect];
			
			let selectDOM = document.querySelectorAll(classSelect)[indexDataSelect];
			let optionDOM =	document.querySelectorAll(classSelect)[indexDataSelect].options[indexDataOption];
			let dktOpcoes =	document.querySelectorAll(`[data-dkt-select="${indexDataSelect}"]`);
			
			let placeholder = selectDOM.getAttribute('data-placeholder');

			let hasIcon = selectDOM.hasAttribute('data-icone');
			let valorIcone = selectDOM.getAttribute('data-icone');

			
			if(isMultiple === false){
				headerSelect.innerHTML = optionDOM.text;

				Array.prototype.forEach.call(selectDOM.options, (opcaoDOM) => {
					opcaoDOM.removeAttribute('selected');
				});

				Array.prototype.forEach.call(dktOpcoes, (dktOpcao) => {
					dktOpcao.classList.remove('selected');
				});

				optionDOM.setAttribute('selected','selected');
				dktOption.classList.add('selected');

				inseriIconeNoHeader(hasIcon, indexDataSelect, valorIcone);
				headerSelect.classList.remove('opened');
				listaSelect.classList.remove('show');

			}else{
				let checkboxOption = dktOption.querySelector('input[type=checkbox]');
				let contaSelecionados = 0;
				let textoSelecionado = "";
				
				dktOption.classList.toggle('selected');
				optionDOM.toggleAttribute('selected');
				checkboxOption.toggleAttribute('checked');

				Array.prototype.forEach.call(selectDOM.options, (opcaoDOM) => {
					if(opcaoDOM.hasAttribute('selected')){
						contaSelecionados++;
						textoSelecionado = opcaoDOM.text;
					}
				});

				if(contaSelecionados > 1){
					headerSelect.innerHTML = `${contaSelecionados} itens selecionados`;
					
					if(selectDkt.classList.contains('dkt-type-select') === false){
						selectDkt.classList.add('active');
					}
					
				}else if(contaSelecionados === 1){
					headerSelect.innerHTML = textoSelecionado;
					
					if(selectDkt.classList.contains('dkt-type-select') === false){
						selectDkt.classList.add('active');
					}

				}else if(contaSelecionados <= 0){
					selectDkt.classList.remove('active');	

					if(placeholder !== null){
						headerSelect.innerHTML = placeholder;
					}else{
						headerSelect.innerHTML = selectDOM.options[0].text
					}
				}

				inseriIconeNoHeader(hasIcon, indexDataSelect, valorIcone);
			}

			triggerEvent(selectDOM, 'change');
		});
	});
}


function clickForaSelect(){
    /**
     * Fecha todos os selects quando clica fora de um apenas
     */
    window.addEventListener('click', function(e){   
		let geralSelects = document.querySelectorAll('.dkt-select');
		let geralListagens = document.querySelectorAll('.dkt-listagem');
		let contagem = 0;
		let headerSelect = document.querySelectorAll('.dkt-select-header');

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
				let ulListagem = lista.querySelector('.dkt-ul-listagem');
				let selectBusca = lista.querySelector('.dkt-select-input-busca');

				lista.classList.remove('show');
				ulListagem.innerHTML = "";
				selectBusca.value = "";
            });
		}
    });
}

function inseriIconeNoHeader(hasIcon, indexSelect, valorIcone){
	let headerSelect = document.querySelectorAll('.dkt-select-header')[indexSelect];

	if(hasIcon === true){
		headerSelect.insertAdjacentHTML('afterbegin', `<i class="${valorIcone}"></i>`);
	}
}


function keypressEnter(){
	window.addEventListener('keydown', (e) => {
		if(e.keyCode === 13){
			if(e.target.classList.contains('dkt-select-option') === true){
				triggerEvent(e.target, 'click');
			}

			else if(e.target.classList.contains('dkt-select') === true){
				let headerSelect = e.target.querySelector('.dkt-select-header');

				triggerEvent(headerSelect, 'click');
			}
		}
	});
}

function keypressEsc(){
	window.addEventListener('keydown', (e) => {
		if(e.keyCode === 27){
			if(e.target.classList.contains('dkt-select-option') === true){
				triggerEvent(document.body, 'click');
			}else if(e.target.classList.contains('dkt-select') === true){
				triggerEvent(document.body, 'click');
			}else if(e.target.classList.contains('dkt-select-input-busca') === true){
				triggerEvent(document.body, 'click');
			}
		}
	});
}

function botaoLimpar(index){
	let botaoLimpar = document.querySelectorAll('.dkt-btn-limpar')[index];
	
	if(botaoLimpar){
		let selectDkt = document.querySelectorAll('.dkt-select')[index];
		let indexSelect = botaoLimpar.getAttribute('data-limpa-select');
		let optionsSelect = document.querySelectorAll(`.dkt-select-option-${indexSelect}`);

		botaoLimpar.addEventListener('click', () => {
			Array.prototype.forEach.call(optionsSelect, (option) => {
				if(option.classList.contains('selected')){
					triggerEvent(option, 'click');
				}
			});

			selectDkt.classList.remove('active');
		});
	}
}

const select = {
	single: (classSelect, args = false) => {
		let selects = document.querySelectorAll(classSelect);

		let idLimpar = false;
		let idAplicar = false;
		let classLimpar = false;
		let footer = false;
		let classAplicar = false;
		let type = 'filter';

		if(args != false){
			let item = args[0];
			idLimpar = item.idLimpar != undefined ? item.idLimpar : false;
			classLimpar = item.classLimpar != undefined ? item.classLimpar : false;
			idAplicar = item.idAplicar != undefined ? item.idAplicar : false;
			footer = item.footer != undefined ? item.footer : false;
			classAplicar = item.classAplicar != undefined ? item.classAplicar : false;
			type = item.type != undefined ? item.type : 'filter';
		}

		Array.prototype.forEach.call(selects, (select, indexSelect) => {

			/**
			 * Esconde todos os selects
			 */
			select.setAttribute('hidden','hidden');

			let irmao = select.previousElementSibling;
			let isMultiple = select.hasAttribute('multiple');
			let hasIcon = select.hasAttribute('data-icone');
			let disabled = select.hasAttribute('disabled');
			
			let size = select.getAttribute('data-size');
			let valorIcone = select.getAttribute('data-icone');
			let placeholder = select.getAttribute('data-placeholder');
			let textoPlaceholder = '';
			let contaSelecionados = 0;
			let active = false;

			/**
			 * Verifica se o select já esta aplicado para atualizar o dkt-select
			 * quando o for chamado novamente a função e não duplicar
			 */
			if(irmao != null){
				if(irmao.classList.contains('dkt-select') === true){
					irmao.remove();
				}
			}


			if(isMultiple === true){
				Array.prototype.forEach.call(select.options, (opcao) => {
					if(opcao.hasAttribute('selected')){
						contaSelecionados++;
						textoPlaceholder = opcao.text;
					}
				});

				if(contaSelecionados > 1){
					textoPlaceholder = `${contaSelecionados} itens selecionados`;
					active = true;
				}else if(contaSelecionados === 1){
					textoPlaceholder = textoPlaceholder;
					active = true;
				}else if(contaSelecionados <= 0){
					active = false;
					if(placeholder !== null){
						textoPlaceholder = placeholder;
					}else{
						textoPlaceholder = select.options[0] != null ? select.options[0].text : '';
					}
				}
			}else{
				Array.prototype.forEach.call(select.options, (opcao) => {
					if(opcao.hasAttribute('selected')){
						contaSelecionados++;
						textoPlaceholder = opcao.text;
					}
				});

				if(placeholder !== null){
					if(contaSelecionados >= 1){
						active = true;
						textoPlaceholder = textoPlaceholder;
					}else{
						active = false;
						textoPlaceholder = placeholder;
					}
				}else{
					if(contaSelecionados >= 1){
						active = true;
						textoPlaceholder = textoPlaceholder;
					}else if(contaSelecionados <= 0) {
						active = false;
						textoPlaceholder = select.options[0] != null ? select.options[0].text : '';
					}
				}
			}

			select.insertAdjacentHTML('beforebegin', 
				estruturaPrincipal(
					textoPlaceholder,
					indexSelect,
					size,
					isMultiple,
					hasIcon,
					disabled,
					footer,
					active,
					idLimpar,
					idAplicar,
					classLimpar,
					classAplicar,
					type
				)
			);

			inseriIconeNoHeader(hasIcon, indexSelect, valorIcone);
			search('dkt-select-buscar-'+indexSelect, '[data-dkt-select="'+indexSelect+'"]');
		});


		clickNoSelect(classSelect);
		clickForaSelect();
		keypressEnter();
		keypressEsc();
	}
}
export { select }