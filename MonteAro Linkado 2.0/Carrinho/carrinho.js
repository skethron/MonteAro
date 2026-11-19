
var CHAVE = "montearo_carrinho";

function ler() {
  try {
    var dados = JSON.parse(localStorage.getItem(CHAVE));
    if (!Array.isArray(dados)) return [];
    // Ignora registros incompletos para não contaminar o contador.
    return dados.filter(function (item) {
      return item && item.slug && isFinite(Number(item.preco));
    });
  } catch (erro) {
    return [];
  }
}

// Salva a lista de itens
function gravar(itens) {
  try {
    localStorage.setItem(CHAVE, JSON.stringify(itens));
  } catch (erro) {
    // armazenamento bloqueado ou cheio: o carrinho não salva
  }
}

// Quantidade total de pneus no carrinho
function total() {
  return ler().reduce(function (soma, item) {
    return soma + item.qtd;
  }, 0);
}

function atualizarContador() {
  var quantidade = total();
  document.querySelectorAll(".carrinho-contador").forEach(function (el) {
    el.textContent = quantidade;
    el.hidden = quantidade === 0;
  });
}

document.addEventListener("click", function (evento) {
  var botao = evento.target.closest(".botao-carrinho");
  if (!botao) return;

  var dados = botao.dataset;
  if (!dados.slug) return; // links de navegação também usam esta classe

  var itens = ler();
  var item = itens.find(function (i) {
    return i.slug === dados.slug;
  });

  if (item) {
    item.qtd += 1; 
  } else {
    itens.push({
      slug: dados.slug,
      marca: dados.marca,
      modelo: dados.modelo,
      medida: dados.medida,
      preco: Number(dados.preco),
      imagem: dados.imagem,
      qtd: 1
    });
  }

  gravar(itens);
  atualizarContador();

  // Leva o visitante direto para a página do carrinho.
  window.location.href = "../Carrinho/carrinho.html";
});

atualizarContador();

window.lerCarrinho = ler;
window.gravarCarrinho = gravar;
window.totalCarrinho = total;
window.atualizarContador = atualizarContador;
