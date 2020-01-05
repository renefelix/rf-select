export default function estruturaPrincipal(placeholder, indexSelect){
   return `<div class="rf-select" tabindex="0" role="listbox">
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