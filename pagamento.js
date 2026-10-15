
const formulario = document.getElementById("formulario-pagamento");

// Elementos do resumo da compra
const resumo = document.querySelector(".resumo-compra");
const linhasResumo = resumo.querySelectorAll(".resumo-linha");

const produtoElemento = linhasResumo[0].querySelector("span:last-child");
const freteElemento = linhasResumo[1].querySelector("span:last-child");
const totalElemento = linhasResumo[2].querySelector("span:last-child");

// Lê as informações enviadas pela página do produto
const parametros = new URLSearchParams(window.location.search);

const produto = parametros.get("produto");
const precoRecebido = Number(parametros.get("preco"));

// Formata os valores em reais
function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// Confere os dados recebidos antes de exibi-los
const produtosValidos = {
    "Goku": 99.90,
    "Patolino": 89.90,
    "Spider-Man": 99.90,
    "Batman": 99.90
};

const produtoExiste = Object.prototype.hasOwnProperty.call(
    produtosValidos,
    produto
);

if (produtoExiste && precoRecebido === produtosValidos[produto]) {
    produtoElemento.textContent = produto;
    freteElemento.textContent = "A calcular";
    totalElemento.textContent = formatarMoeda(precoRecebido);
} else {
    produtoElemento.textContent = "Nenhum produto selecionado";
    freteElemento.textContent = "A calcular";
    totalElemento.textContent = "A calcular";
}

// Validação do formulário
formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();

    const pagamentoSelecionado = document.querySelector(
        'input[name="pagamento"]:checked'
    );

    if (!produtoExiste || precoRecebido !== produtosValidos[produto]) {
        alert("Volte à loja e selecione um produto válido.");
        return;
    }

    if (!nome || !email || !pagamentoSelecionado) {
        alert("Preencha seus dados e escolha uma forma de pagamento.");
        return;
    }

    const formasPagamento = {
        pix: "PIX",
        cartao: "Cartão de crédito",
        boleto: "Boleto bancário"
    };

    const formaEscolhida = formasPagamento[pagamentoSelecionado.value];

    alert(
        "Tudo certo, " + nome + "!\n\n" +
        "Produto: " + produto + "\n" +
        "Valor: " + formatarMoeda(precoRecebido) + "\n" +
        "Pagamento: " + formaEscolhida + "\n\n" +
        "Esta é uma demonstração. Nenhum pagamento foi realizado."
    );
});
