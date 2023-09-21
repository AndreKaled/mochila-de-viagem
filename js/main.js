const form = document.getElementById("novoItem");
const lista = document.getElementById('lista');
const itens = JSON.parse(localStorage.getItem("itens"));

//atualizando itens do localstorage até o html
itens.forEach((elemento) =>{
    criarElemento(elemento)
});

form.addEventListener("submit", (evento) => {
    //sobreescrevendo evento padrao de enviar pra propria pag.
    evento.preventDefault();

    const nome = evento.target.elements["nome"].value;
    const quant = evento.target.elements["quantidade"].value;

    const itemAtual = {
        "nome": nome,
        "quant": quant
    }

    criarElemento(itemAtual);

    //armazenando dados no localstorage do navegador

    //adicionando na lista
    itens.push(itemAtual);

    //adicionando lista no localstorage, com chave e valor
    localStorage.setItem("itens", JSON.stringify(itens));
});

//criando e adicionando elemento com os dados na lista
function criarElemento(elemento){
    const novoItem = document.createElement('li');

    novoItem.classList.add('item');

    const numeroItem = document.createElement('strong');
    numeroItem.innerHTML = elemento.quant;

    novoItem.appendChild(numeroItem);
    novoItem.innerHTML += elemento.nome;

    lista.appendChild(novoItem);
}
console.log("AAA");