const getSavedCartItems = () => localStorage.getItem('cartItems');

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}

// const lista = document.querySelector('.cart__items');
// lista.innerHTML = 