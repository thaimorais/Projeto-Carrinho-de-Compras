const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  test('Testa se o método localStorage é chamado ao executar a função', () => {
    saveCartItems('<li>Item</li>');
    expect(localStorage.setItem).toHaveBeenCalled();
  });
  test('Testa se o método localStorage é chamado com dois parâmetros ao executar a função', () => {
    saveCartItems('<li>Item</li>');
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', '<li>Item</li>');
  });
});
