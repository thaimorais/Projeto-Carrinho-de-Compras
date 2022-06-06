const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  test('Testa se o método localStorage é chamado ao executar a função', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalled();
  });
  test('Testa se o método localStorage é chamado com o parâmetro /cartItems/ ao executar a função', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
  });
});
