// Carrinho da Monte-Aro.
// Os itens ficam salvos no mesmo localStorage que as páginas de produto usam,
// então o que for adicionado no site aparece aqui (e continua após recarregar).

var CHAVE = "montearo_carrinho";

let carrinho = [];


function formatarPreco(valor) {
    return valor.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}


function criarSlug(texto) {
    return String(texto)
        .toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '') || 'item';
}


function nomeDoItem(item) {
    const base = [item.marca, item.modelo].filter(Boolean).join(' ');
    return item.medida ? base + ' — ' + item.medida : base;
}


function lerItens() {
    let dados;

    try {
        dados = JSON.parse(localStorage.getItem(CHAVE));
    } catch (erro) {
        return [];
    }

    if (!Array.isArray(dados)) return [];

    return dados
        .filter(item => item && (item.slug || item.nome) && isFinite(Number(item.preco)))
        .map(item => {
            const modelo = item.modelo || item.nome || 'Produto';
            return {
                slug: item.slug || criarSlug(modelo),
                marca: item.marca || '',
                modelo: modelo,
                medida: item.medida || '',
                preco: Number(item.preco) || 0,
                imagem: item.imagem || '',
                quantidade: Math.max(1, Math.floor(Number(item.qtd || item.quantidade) || 1)),
                nome: nomeDoItem({
                    marca: item.marca,
                    modelo: modelo,
                    medida: item.medida
                })
            };
        });
}


function gravarItens() {
    try {
        localStorage.setItem(CHAVE, JSON.stringify(carrinho.map(item => ({
            slug: item.slug,
            marca: item.marca,
            modelo: item.modelo,
            medida: item.medida,
            preco: item.preco,
            imagem: item.imagem,
            qtd: item.quantidade
        }))));
    } catch (erro) {
        // armazenamento bloqueado: o carrinho continua na memória da página
    }
}


function adicionarAoCarrinho(nome, preco) {

    const slug = criarSlug(nome);

    const itemExistente = carrinho.find(
        item => item.slug === slug
    );

    if (itemExistente) {
        itemExistente.quantidade++;
    } else {
        carrinho.push({
            slug: slug,
            marca: '',
            modelo: nome,
            medida: '',
            preco: Number(preco) || 0,
            imagem: '',
            quantidade: 1,
            nome: nome
        });
    }

    atualizarCarrinho();
}


function alterarQuantidade(slug, valor) {

    const item = carrinho.find(
        produto => produto.slug === slug
    );

    if (!item) return;

    item.quantidade += valor;

    if (item.quantidade <= 0) {
        removerItem(slug);
        return;
    }

    atualizarCarrinho();
}


function removerItem(slug) {

    carrinho = carrinho.filter(
        item => item.slug !== slug
    );

    atualizarCarrinho();
}


function limparCarrinho() {

    carrinho = [];

    atualizarCarrinho();
}


function atualizarCarrinho() {

    gravarItens();

    const listaCarrinho = document.getElementById(
        'lista-carrinho'
    );

    const contadorCarrinho = document.getElementById(
        'contador-carrinho'
    );

    const totalCarrinho = document.getElementById(
        'total-carrinho'
    );

    const totalInterno = document.getElementById(
        'total-carrinho-carrinho'
    );

    listaCarrinho.innerHTML = '';

    let total = 0;
    let quantidadeTotal = 0;

    carrinho.forEach(item => {

        const subtotal = item.preco * item.quantidade;

        total += subtotal;
        quantidadeTotal += item.quantidade;

        const li = document.createElement('li');

        const nome = document.createElement('span');
        nome.textContent = item.nome;

        const controles = document.createElement('div');
        controles.className = 'controles-quantidade';

        const diminuir = document.createElement('button');
        diminuir.textContent = '-';
        diminuir.className = 'btn-quantidade';
        diminuir.onclick = () => alterarQuantidade(item.slug, -1);

        const quantidade = document.createElement('span');
        quantidade.textContent = item.quantidade;

        const aumentar = document.createElement('button');
        aumentar.textContent = '+';
        aumentar.className = 'btn-quantidade';
        aumentar.onclick = () => alterarQuantidade(item.slug, 1);

        const preco = document.createElement('strong');
        preco.textContent = 'R$ ' + formatarPreco(subtotal);

        const remover = document.createElement('button');
        remover.textContent = 'Remover';
        remover.className = 'btn-remover';
        remover.onclick = () => removerItem(item.slug);

        controles.append(
            diminuir,
            quantidade,
            aumentar
        );

        li.append(
            nome,
            controles,
            preco,
            remover
        );

        listaCarrinho.appendChild(li);
    });

   
    contadorCarrinho.textContent = quantidadeTotal;

    const contadorSite = document.querySelector('.carrinho-contador');
    if (contadorSite) {
        contadorSite.textContent = quantidadeTotal;
        contadorSite.hidden = quantidadeTotal === 0;
    }

    totalCarrinho.textContent = formatarPreco(total);

    if (totalInterno) {
        totalInterno.textContent = formatarPreco(total);
    }
}


carrinho = lerItens();
atualizarCarrinho();
