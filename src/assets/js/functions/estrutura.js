/**
 * Função responsável por montar a estrutura necessária para a criação do RF Select
 * @param {string} placeholder 
 * @param {number} indexSelect 
 */
export default function estruturaPrincipal(placeholder, indexSelect, disabled){
   return `<div class="rf-select ${disabled === true ? 'rf-select-disabled' : ''}" tabindex="0" role="listbox">
        <div class="rf-select-header">
            ${placeholder}
        </div>

        <div class="rf-listagem">
			<div class="rf-select-busca">
				<input class="rf-select-input-busca" type="text" value="" placeholder="Buscar" id="rf-select-buscar-${indexSelect}" data-rf-select="${indexSelect}" />
			</div>

			<div class="rf-scroll">
				<ul class="rf-ul-listagem" role="list"></ul>
			</div>
		</div>
   </div>`;
}