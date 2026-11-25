# Monte-Aro Pneus

Site institucional e vitrine de pneus, aros e acessórios da **Monte-Aro**, feito em HTML, CSS e JavaScript puro, com login de usuários via Firebase Authentication.

Não há backend próprio: o catálogo é estático e o carrinho fica salvo no `localStorage` do navegador.

---

## Projeto de extensão

**Projeto de Extensão em Desenvolvimento de Software** — Faculdade UNINOVE.

| Integrante | RA |
|---|---|
| Samuel Salmi (líder) | 1726203098 |
| Álvaro Augusto Ribeiro Oliveira | 1726202964 |
| Eduardo Amancio da Silva | 426104086 |
| Felipe da Costa Pereira | 926119964 |
| João Guilherme Lourenço da Silva | 926108244 |
| Joyce Ione da Silva | 1726200467 |
| Mateus Mendes Pinto | 926205200 |
| Pedro Henrique Barbosa Pimentel | 926208606 |
| Wladimir de Almeida Neto | 1726202283 |

  ### PROJETO DE EXTENSÃO EM DESENVOLVIMENTO DE SOFTWARE
  ### FACULDADE UNINOVE
  ## MEMBROS 
Samuel Salmi RA - 1726203098  ( Líder ) , Álvaro Augusto Ribeiro Oliveira RA - 1726202964,  Eduardo Amancio da Silva RA - 426104086, Felipe da Costa Pereira RA - 926119964, João Guilherme Lourenço da Silva RA - 926108244, Joyce Ione da Silva RA - 1726200467, Mateus Mendes Pinto RA - 926205200, Pedro Henrique Barbosa Pimentel RA - 926208606, Wladimir de Almeida Neto RA - 1726202283

---

## Como abrir

### Opção 1 — duplo clique (mais simples)

Abra **`Inicio/inicio.html`** no navegador. Todos os links são relativos, então a navegação, o carrinho e o login funcionam direto por `file://`.

> O login precisa de internet (Firebase), mas funciona também abrindo os arquivos por duplo clique.


---

## Estrutura

```
MonteAro/
├── Inicio/
│   └── inicio.html            Página inicial (banner, benefícios, destaques, catálogo, marcas)
├── Pneus/
│   ├── pagPneus.html          Catálogo completo de pneus
│   └── 13 páginas de produto (michelin-primacy-4.html, pirelli-cinturato-p7.html, ...)
├── Aros/
│   ├── aros.html              Catálogo de aros
│   └── 4 páginas de produto (aro-14-chevrolet.html, aro-15-volkswagen.html, ...)
├── Acessórios/
│   ├── Acessórios.html        Página de acessórios
│   └── style.css
├── Marcas/
│   ├── Marcas.html            Catálogo de marcas (Pirelli, Michelin, Goodyear, Bridgestone)
│   └── Marcas.css
├── Carrinho/
│   ├── carrinho.html          Página do carrinho (3 ofertas + lista + total)
│   ├── styles.css             Estilos próprios do carrinho
│   ├── cabecalho.css          Cabeçalho do site isolado para esta página
│   ├── script.js              Lógica do carrinho desta página
│   ├── carrinho.js            Script compartilhado por todas as páginas (contador + adicionar)
│   └── fundoMonteAro4k.jpg.jpeg
├── Login/
│   ├── login.html             Tela de login
│   ├── style.css
│   ├── login.js               Entrada, saída e mensagens de erro
│   ├── firebase-config.js     Inicialização do Firebase
│   └── proteger-perfil.js     Protege a página de perfil
├── Perfil/
│   ├── perfil.html            Perfil do usuário (protegido por login)
│   ├── script.js              Foto, "Meus Dados" e dados salvos no navegador
│   ├── css/style.css
│   └── img/
├── Suporte/
│   ├── suporte.html           Central de relacionamento / dúvidas frequentes
│   └── suporte.css
├── css/
│   ├── style.css              Base do site: paleta, cabeçalho, rodapé, cards
│   ├── catalogo.css           Grade dos catálogos
│   └── produto.css            Página de produto (foto, ficha técnica)
└── imagens/                   Logos, banners e fotos dos produtos
```

**Total:** 26 páginas HTML.

---

## Páginas

| Página | Arquivo | Observações |
|---|---|---|
| Início | `Inicio/inicio.html` | Entrada do site, com banner e vitrine |
| Pneus | `Pneus/pagPneus.html` | Catálogo com filtro visual por card |
| Pneu (produto) | `Pneus/*.html` | Foto, nome, marca, "sobre o produto" e ficha técnica |
| Aros | `Aros/aros.html` | Catálogo de rodas |
| Aro (produto) | `Aros/*.html` | Mesma estrutura dos pneus |
| Acessórios | `Acessórios/Acessórios.html` | Produtos de limpeza e cuidados |
| Marcas | `Marcas/Marcas.html` | Cards das marcas com botão "Ver Detalhes" |
| Carrinho | `Carrinho/carrinho.html` | Lista, quantidades, total e ofertas "VEJA TAMBÉM" |
| Login | `Login/login.html` | E-mail e senha (Firebase) |
| Perfil | `Perfil/perfil.html` | Só abre com usuário logado |
| Suporte | `Suporte/suporte.html` | Contatos e links úteis |

---

## Carrinho

O carrinho é **único para o site**: qualquer página grava e lê a mesma chave.

- **Chave:** `montearo_carrinho` (no `localStorage`)
- **Formato de cada item:**

```js
{
  slug: "michelin-primacy-4",
  marca: "Michelin",
  modelo: "Primacy 4",
  medida: "205/55 R16 91V",
  preco: 609.9,
  imagem: "../imagens/pneu1.png",
  qtd: 1
}
```

### Fluxo

1. Na página de um produto, clique em **Adicionar ao carrinho**.
2. O item é salvo (ou a quantidade é somada, se o `slug` já existir).
3. O visitante é levado para `Carrinho/carrinho.html`.
4. Lá é possível alterar a quantidade (`−` / `+`), remover item por item ou limpar tudo.
5. O contador do cabeçalho acompanha o total de peças (some quando está zerado).
6. Ao recarregar ou fechar o navegador, o carrinho continua salvo naquele navegador.

Duas medidas do mesmo modelo são itens diferentes, porque o `slug` é único.

### Para adicionar um produto ao carrinho

Basta um botão com a classe `botao-carrinho` e os dados no `data-*`:

```html
<button type="button" class="botao-carrinho"
    data-slug="michelin-primacy-4"
    data-marca="Michelin"
    data-modelo="Primacy 4"
    data-medida="205/55 R16 91V"
    data-preco="609.90"
    data-imagem="../imagens/pneu1.png">
    Adicionar ao carrinho
</button>
```

O `Carrinho/carrinho.js` já cuida do clique, do contador e do redirecionamento. Ele ignora links que usam a classe sem `data-slug` (é o caso do botão "Meu Carrinho" no perfil).

### Funções disponíveis

| Função | Onde | Para que serve |
|---|---|---|
| `lerCarrinho()` | global | Devolve a lista de itens |
| `gravarCarrinho(itens)` | global | Salva a lista |
| `totalCarrinho()` | global | Soma as quantidades |
| `atualizarContador()` | global | Atualiza o número no cabeçalho |
| `adicionarAoCarrinho(nome, preco)` | `Carrinho/script.js` | Usado pelos 3 cards de oferta |
| `alterarQuantidade(slug, delta)` | `Carrinho/script.js` | Botões `−` / `+` |
| `removerItem(slug)` | `Carrinho/script.js` | Remove uma linha |
| `limparCarrinho()` | `Carrinho/script.js` | Esvazia o carrinho |

---

## Login e perfil

- **Serviço:** Firebase Authentication (e-mail e senha), SDK *compat* 10.12.2 via CDN.
- **Projeto:** `montearo` — configuração em `Login/firebase-config.js`.
- **Login:** `Login/login.js` autentica e redireciona para `../Perfil/perfil.html`. Quem já está logado vai direto ao perfil ao abrir a tela de login.
- **Proteção:** `Login/proteger-perfil.js` esconde a página até confirmar o usuário; sem login, volta para `login.html`. Se o Firebase não carregar ou demorar mais de 10 s, a página é liberada para não travar.
- **Perfil:** foto escolhida no computador (prévia imediata), janela "Meus Dados" (nome, e-mail, CPF, nascimento) e botão de sair. Nome/e-mail ficam no `localStorage` (`nome`, `email`, ...), só para exibição.
- Senhas e contas são gerenciadas no **Firebase Console** do projeto; o site não guarda senha.

> Para trocar de conta, use uma janela anônima ou limpe os dados do site — como o login redireciona automaticamente, a tela de login só aparece quando não há usuário ativo.

---

## Cabeçalho e layout

- **Cabeçalho do site:** `.faixa-contato` (faixa preta) + `header.cabecalho` (amarelo) + `.menu-categorias` (preto). Está em `css/style.css` e é repetido em todas as páginas internas.
- **Menu:** Pneus, Marcas, Aros, Acessórios e Suporte. O item **Marcas** aponta para `Marcas/Marcas.html` em todas as páginas e fica marcado como ativo nessa página. A seção "Marcas em destaque" da home continua lá (`id="marcas"`), agora acessível apenas rolando a página.
- **Página de Marcas:** usa `../css/style.css` (cabeçalho) + `Marcas.css` (conteúdo). O `Marcas.css` tem fundo amarelo próprio e regras de `button` escopadas em `.marcas-grid` para não afetar o botão de busca do cabeçalho.
- **Carrinho:** por ter um CSS antigo com regras globais de `header` e `.container`, o cabeçalho foi copiado para `Carrinho/cabecalho.css`, todo escopado em `.cabecalho-site`. **Se o cabeçalho do site mudar, atualize esse arquivo também.**
- **Paleta:** amarelo `#f4b32b`, preto `#171717`, fundo `#f6f6f4`.
- **Fundo do carrinho:** camada fixa com `fundoMonteAro4k.jpg.jpeg`, centralizada e levemente ampliada para a logo aparecer abaixo dos cards.
- **Breakpoints:** 960px (cabeçalho em duas linhas), 760px (container e menu), 560px (faixa empilhada, logo menor), 768px/380px (grade do carrinho).

---

## Manutenção

**Novo pneu:** copie `Pneus/michelin-primacy-4.html`, ajuste título, textos, ficha, foto e os `data-*` do botão. Depois inclua um card em `Pneus/pagPneus.html` (e, se quiser, na home).

**Novo aro:** mesmo processo em `Aros/`.

**Preços:** estão no texto do card, no bloco de preço da página e no `data-preco` do botão — mantenha os três iguais.

**Fotos:** ficam em `imagens/`. As imagens de produto são PNG com fundo transparente e proporção 4:3.

---

## Limitações conhecidas

- A página `Marcas/Marcas.html` está ligada ao cabeçalho, mas os botões "Ver Detalhes" apontam para `pirelli.html`, `michelin.html`, `goodyear.html` e `bridgestone.html`, que ainda não existem na pasta `Marcas`. As logos das marcas vêm de URLs externas (precisam de internet).
- Não existe checkout nem pagamento: o carrinho é só uma lista local.
- O carrinho é por navegador — não sincroniza entre dispositivos nem com a conta.
- A busca do cabeçalho é visual (não filtra produtos).
- Dados do perfil (nome, e-mail, CPF) ficam no `localStorage`, sem validação de servidor.
- Alguns arquivos são pesados (banners ~1,9 MB e fundo 4K ~1 MB); para publicar, vale compactar as imagens.
- O site foi testado em Chrome/Edge atuais, no desktop e em telas de 390px.
