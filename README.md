# RF Select
RF Select é uma função interiamente em JavaScript que manipula o elemento `<select>` do HTML e permite torná-lo visualmente mais elegante e customizado. Isso sem precisar da utilização de jQuery ou qualquer outra biblioteca JavaScript.

## Iniciando o projeto

O projeto foi desenvolvido com webpack, e para iniciar ele de forma correta, basta seguir os passos a seguir:

```npm install```

Para utilizar na versão DEV, 

```npm run watch```

Instalar o servidor local:

```npm install http-server -g```

Inicar o projeto com base na pasta DIST:

```http-server ./dist -O```


## Placeholder
A função de placeholder é responsável por exbir o texto correto do select. Esse texto é mostrado no header do RF-Select, ou seja, no elemento `.rf-select-header`.

A exibição do texto é feito diante algumas regras:

- Caso nenhuma opção do `<select>` esteja recebendo o atributo `selected`, por padrão, o texto do _placeholder_ será o conteúdo dentro da primeira `<option>`. Com ressalva quando o `<select>` possuir o data atributo `data-placeholder`. 
- Caso o `<select>` possua uma `<option>` com o atributo `selected`, o _placeholder_ exibirá o conteúdo dessa opção. 
- Se o `<select>` for um elemento que permita selecionar apenas uma opção e tiver mais de uma `<option>` com o atributo `selected`, o _placeholder_ exibirá o conteúdo da última opção selecionada.
- Caso o `<select>` possua o atributo `multiple`, e mais de um `<option>` estiver selecionado, o placeholder do elemento será o número da quantidade de opções selecionadas seguido da frase "itens selecionados". Exemplo: _3 itens selecionados_

### data-placeholder
O `data-placeholder` é um atributo definido no elemento `<select>`. 

Quando nenhuma `<option>` estiver recebento com o atributo `selected`, o texto do data atributo é o que será exibido como _placeholder_.

**Como usar**
```<select data-placeholder="Escolha uma cidade"></select>```