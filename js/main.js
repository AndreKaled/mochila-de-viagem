const form = document.getElementById("novoItem");
const lista = document.getElementById('lista');
const itens = JSON.parse(localStorage.getItem("itens")) || [];

//atualizando itens do localstorage até o html
itens.forEach((elemento) =>{
    criarElemento(elemento)
});

form.addEventListener("submit", (evento) => {
    //sobreescrevendo evento padrao de enviar pra propria pag.
    evento.preventDefault();

    const nome = evento.target.elements["nome"];
    const quant = evento.target.elements["quantidade"];

    //verificando existencia na lista
    const existe = itens.find( (elemento) => elemento.nome === nome.value);

    const itemAtual = {
        "nome": nome.value,
        "quant": quant.value,
    }

    //testando condição de existencia para atualizar ou adicionar
    if(existe){
        itemAtual.id = existe.id
        atualizarItem(itemAtual);
        itens[itens.findIndex( elemento => elemento.id === existe.id)] = itemAtual;
    }else{
        itemAtual.id = itens[itens.length-1] ? (itens[itens.length-1].id) +1 : 0
        criarElemento(itemAtual);

        //armazenando dados no localstorage do navegador
        //adicionando na lista
        itens.push(itemAtual);
    }

     //adicionando lista no localstorage, com chave e valor
     localStorage.setItem("itens", JSON.stringify(itens));

    nome.value = "";
    quant.value = "";
});

//criando e adicionando elemento com os dados na lista
function criarElemento(item){
    const novoItem = document.createElement('li');

    novoItem.classList.add('item');

    const numeroItem = document.createElement('strong');
    numeroItem.innerHTML = item.quant;

    //adicionando id do elemento para fazer busca e atualização
    numeroItem.dataset.id = item.id;

    novoItem.appendChild(numeroItem);
    novoItem.innerHTML += item.nome;

    novoItem.appendChild(botaoDeletar(item.id));

    lista.appendChild(novoItem);
}
function atualizarItem(item){
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quant;
}

//adicionado botoes de exclusao para os itens
function botaoDeletar(id){
    const elementBotao = document.createElement("button");
    elementBotao.innerText = "X"

    elementBotao.addEventListener("click", function(){
        deletaElemento(this.parentNode, id)
    })

    return elementBotao
}

function deletaElemento(tag, id){
    //remove item da lista
    tag.remove();

    //removendo item do array e sobreescrevendo o localstorage
    itens.splice(itens.findIndex( elemento => elemento.id === id), 1);
    console.log(itens)
    localStorage.setItem("itens", JSON.stringify(itens));
}