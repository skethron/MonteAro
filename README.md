# Monte-Aro Pneus

Loja virtual fictícia de pneus, aros e acessórios automotivos, desenvolvida como projeto de faculdade. O site é **100% estático**: HTML, CSS e um pouco de JavaScript puro, sem frameworks, sem backend e sem etapa de build — basta abrir no navegador.

O objetivo do trabalho foi montar a vitrine completa de uma loja de pneus: página inicial, catálogos por categoria, páginas de produto com descrição e ficha técnica, área de perfil, login, suporte e um carrinho que guarda os itens no próprio navegador.

---

## Sobre o projeto

| | |
|---|---|
| **Tipo** | Site institucional / e-commerce estático (projeto acadêmico) |
| **Tema** | Loja de pneus, rodas e acessórios — Monte-Aro Pneus |
| **Idioma** | Português (pt-BR) |
| **Páginas** | 24 arquivos HTML |
| **Estilo** | HTML5 semântico + CSS3 (Flexbox e Grid) + JavaScript ES5/ES6 |
| **Dependências** | Nenhuma (sem bibliotecas, sem CDN, sem servidor) |

> Projeto desenvolvido para a disciplina do Projeto de Extensão do curso de Ciência da Computação da faculdade UNINOVE, com o objetivo de praticar estruturação de páginas, layout responsivo, organização de CSS e manipulação de dados no navegador.

---

## Funcionalidades

### Navegação e vitrine
- Cabeçalho fixo do site com faixa de contato, logo (leva para a home), busca, atalhos de **Login** e **Carrinho** e menu de categorias.
- Menu com **Pneus · Marcas · Aros · Acessórios · Suporte**, com o item da página atual destacado.
- Home com banner, faixa de benefícios, pneus recomendados, catálogo completo, marcas em destaque e chamada para a seção de aros.
- Catálogo de pneus com 13 modelos e catálogo de aros com 4 medidas (14", 15", 16" e 17").
- Página de acessórios com 10 itens (kit de reparo, pretinho, válvulas, sensor, porcas antifurto, calibrador etc.).

### Páginas de produto
- 17 páginas individuais (13 pneus + 4 aros).
- Foto, marca, nome completo com medida, preço "de/por", desconto no Pix, parcelamento em até 10x sem juros.
- Bloco **Sobre o produto** com texto descritivo e destaques técnicos.
- **Ficha técnica** completa (medida, carga, índice de velocidade, garantia, etc.).
- Resumo da ficha ao lado do preço, selos de confiança e lista de vantagens.
- Botão **Adicionar ao carrinho** em todas as páginas.

### Carrinho
- Adiciona, agrupa por produto e incrementa quantidade.
- Itens persistem no navegador via `localStorage` (chave `montearo_carrinho`).
- Contador no cabeçalho atualiza em todas as páginas do site.
- Feedback visual no botão ("Adicionado ✓" por 2 segundos).
- Funções públicas para a futura página do carrinho: `lerCarrinho()`, `gravarCarrinho()`, `totalCarrinho()` e `atualizarContador()`.

### Perfil
- Página autônoma com fundo próprio e layout em "cartões".
- Troca da foto de perfil a partir de um arquivo local.
- Janela **Meus Dados** (nome, e-mail, CPF, data de nascimento) com dados salvos no `localStorage`.
- Botão **Meu Carrinho** levando para `carrinho.html`.

### Outras páginas
- **Login**: tela de autenticação.
- **Suporte**: perguntas frequentes.

### Responsividade
- Layout adaptado para desktop, tablet e celular, com breakpoints em 960px, 768px, 760px, 560px e 480px.
- Fotos de produto em proporção 4:3 preenchendo o card, sem moldura.
- Menu e busca reorganizados em duas linhas em telas médias.

---

## Páginas do site

| Página | Arquivo | Conteúdo |
|---|---|---|
| Início | `Inicio/inicio.html` | Banner, benefícios, destaques, catálogo e marcas |
| Catálogo de pneus | `Pneus/pagPneus.html` | 13 pneus em grade |
| Pneus (produto) | `Pneus/*.html` | 13 páginas de produto |
| Catálogo de aros | `Aros/aros.html` | 4 aros + aviso sobre medidas |
| Aros (produto) | `Aros/*.html` | 4 páginas de produto |
| Acessórios | `Acessórios/Acessórios.html` | 10 itens de loja |
| Perfil | `Perfil/perfil.html` | Foto, dados do usuário, atalhos |
| Login | `Login/login.html` | Formulário de acesso |
| Suporte | `Suporte/suporte.html` | Dúvidas frequentes |

---

## Estrutura de pastas

```
MonteAro/
├── Acessórios/
│   ├── Acessórios.html
│   ├── style.css
│   └── imagens/
├── Aros/
│   ├── aros.html
│   ├── aro-14-chevrolet.html
│   ├── aro-15-volkswagen.html
│   ├── aro-16-toyota.html
│   └── aro-17-ford.html
├── Carrinho/
│   └── carrinho.js
├── css/
│   ├── style.css        # cabeçalho, menu, cards, rodapé (base do site)
│   ├── catalogo.css     # grade dos catálogos e avisos
│   └── produto.css      # layout das páginas de produto
├── imagens/             # logos, banners e fotos dos produtos
├── Inicio/
│   └── inicio.html
├── Login/
│   ├── login.html
│   └── login.css
├── Perfil/
│   ├── perfil.html
│   ├── script.js
│   ├── css/style.css
│   └── img/
├── Pneus/
│   ├── pagPneus.html
│   └── 13 páginas de produto
└── Suporte/
    ├── suporte.html
    └── suporte.css
```

O CSS principal fica em `css/style.css` e é compartilhado por todas as páginas do site. As telas de Login, Suporte, Perfil e Acessórios mantêm folhas de estilo próprias, com identidade visual própria, e continuam funcionando de forma independente.

---

## Detalhes técnicos

### Carrinho (`Carrinho/carrinho.js`)

Cada botão de compra carrega os dados do produto em atributos `data-*`:

```html
<button type="button" class="botao-carrinho"
    data-slug="michelin-primacy-4"
    data-marca="Michelin"
    data-modelo="Primacy 4"
    data-medida="205/55 R16 91V"
    data-preco="609.9"
    data-imagem="../imagens/pneu1.png">
    Adicionar ao carrinho
</button>
```

O script escuta os cliques no documento (delegação de eventos), então **um único arquivo** atende todas as páginas, sem precisar de código repetido. Os itens ficam salvos assim:

```json
[{ "slug": "michelin-primacy-4", "marca": "Michelin", "modelo": "Primacy 4",
   "medida": "205/55 R16 91V", "preco": 609.9, "imagem": "../imagens/pneu1.png", "qtd": 1 }]
```

### Preços e dados dos produtos

Os valores foram levantados a partir de lojas brasileiras (Buscapé, Zoom, Mercado Livre, Magalu, Amazon, Shopee) e ajustados para ficarem consistentes entre card, página de produto e carrinho. O desconto no Pix (5%) e o parcelamento em 10x sem juros são calculados sobre o preço final. As especificações dos aros (furação, offset, diâmetro do cubo) seguem dados de catálogos de fabricantes.

---


