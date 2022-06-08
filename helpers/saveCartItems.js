const saveCartItems = (listaCarrinho) => {
  localStorage.setItem('cartItems', listaCarrinho);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
