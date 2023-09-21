const form = document.getElementById("novoItem");
const lista = document.getElementById('lista');

form.addEventListener("submit", (evento) => {
    //sobreescrevendo evento padrao de enviar pra propria pag.
    evento.preventDefault();

    //testando
    console.log(evento);
    const nome = evento.target.elements["nome"].value;
    const quant = evento.target.elements["quantidade"].value;

    criarElemento(nome,quant);
});

//criando e adicionando elemento com os dados na lista
function criarElemento(nome, quant){
    console.log(nome +"|" +quant);

    const novoItem = document.createElement('li');

    novoItem.classList.add('item');

    const numeroItem = document.createElement('strong');
    numeroItem.innerHTML = quant;

    novoItem.appendChild(numeroItem);
    novoItem.innerHTML += nome;

    lista.appendChild(novoItem);
}