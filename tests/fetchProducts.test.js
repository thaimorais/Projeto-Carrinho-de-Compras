require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  test('Verifica se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });
  test('Verifica se fetch é chamada quando passado o argumento /computador/', async () => {
    expect.assertions(2);
    await fetchProducts('computador');
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith(url);
  });
  test('Verifica se a estrutura é igual a /computadorSearch/ quando passado o argumento /computador/', async () => {
    expect(fetchProducts('computador')).resolves.toEqual(computadorSearch);
  });
  test('Verifica se a mensagem de erro aparece ao não passar argumento', async () => {
    await expect(fetchProducts()).resolves.toThrow(new Error('You must provide an url'));
  });
});
