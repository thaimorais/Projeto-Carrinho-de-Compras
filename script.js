const sectionItemsPai = document.querySelector('.items');
const listCartItems = document.querySelector('.cart__items');
const buttonEsvazia = document.querySelector('.empty-cart');
const resultPrice = document.querySelector('.total-price');
const valor = document.createElement('span');

// Função Storage prices
const preco = [];
const pricesStorage = (price) => localStorage.setItem('prices', JSON.stringify(price));

const getPrices = () => JSON.parse(localStorage.getItem('prices'));

const resultado = () => {
  if (localStorage.getItem('prices')) {
   return getPrices().reduce((acc, cur) => acc + cur, 0);
  }
};

// Função do evento do botão Esvaziar Carrinho
const esvaziaCarrinho = () => {
  listCartItems.innerHTML = '';
  resultPrice.removeChild(valor);
  pricesStorage(preco);
  saveCartItems(listCartItems.innerHTML);
};

buttonEsvazia.addEventListener('click', esvaziaCarrinho);

// Cria o img com a imagem de cada produto
const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

//  Pega o id de cada produto 
const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

// Remove os elementos do carrinho
const cartItemClickListener = (event) => {
  event.target.remove();
  saveCartItems(listCartItems.innerHTML);
};

// Cria a frase do produto que irá aparecer no carrinho
const createCartItemElement = ({ id: sku, title: name, price: salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

// Função do evento de click do botão Adicionar ao Carrinho
function adicionaItem(event) {
  if (event.target.classList.contains('item__add')) {
    const productId = getSkuFromProductItem(event.target.parentElement);
    fetchItem(productId).then((data) => {
      listCartItems.appendChild(createCartItemElement(data));
      const lista = listCartItems.innerHTML;
      saveCartItems(lista);
      const prices = data.price;
      preco.push(prices);
      pricesStorage(preco);
      valor.innerText = `${Math.round((resultado() + Number.EPSILON) * 100) / 100}`;
      resultPrice.appendChild(valor);
    });
  }
}

function loadStorage() {
  if (localStorage.getItem('cartItems')) {
    listCartItems.innerHTML = getSavedCartItems();
    const listas = document.querySelectorAll('li');
    listas.forEach((element) => element.addEventListener('click', cartItemClickListener));
    valor.innerText = `${Math.round((resultado() + Number.EPSILON) * 100) / 100}`;
    resultPrice.appendChild(valor);
  }
}

// Cria o botão Adicionar ao Carrinho e insere o evento adicionaItem
const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  e.addEventListener('click', adicionaItem);
  return e;
};

// Cria os produtos
const createProductItemElement = ({ id: sku, title: name, thumbnail: image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

// Busca os produtos pelo ID
async function createProduct() {
  const loading = document.createElement('h2');
  loading.className = 'loading';
  loading.innerHTML = 'carregando...';
  sectionItemsPai.appendChild(loading);
  await fetchProducts('computador')
    .then((data) => {
      data.results.forEach((product) => {
        sectionItemsPai.appendChild(createProductItemElement(product));
      });
    });
  sectionItemsPai.removeChild(loading);
}

window.onload = () => { createProduct(); loadStorage(); resultado(); };
