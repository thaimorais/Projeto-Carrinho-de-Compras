const sectionItemsPai = document.querySelector('.items');
const listCartItems = document.querySelector('.cart__items');
const buttonEsvazia = document.querySelector('.empty-cart');
const resultPrice = document.querySelector('.total-price');
const value = document.createElement('span');

const sumCart = () => {
  let sum = 0;

  const produtos = document.querySelectorAll('li');
  produtos.forEach((product) => {
    sum += parseFloat(product.innerHTML.split('$')[1] * 100);
  });
  value.innerHTML = sum / 100;
  resultPrice.appendChild(value)
}

// Função do evento do botão Esvaziar Carrinho
const esvaziaCarrinho = () => {
  listCartItems.innerHTML = '';
  resultPrice.removeChild(value);
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
  sumCart();
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
      sumCart();
    });
  }
}

function loadStorage() {
  if (localStorage.getItem('cartItems')) {
    listCartItems.innerHTML = getSavedCartItems();
    sumCart();
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

window.onload = () => { createProduct(); loadStorage(); };
