require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  test('Verifica se fetchItem é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });
  test('Verifica se fetch é chamada quando passado o argumento /MLB1615760527/', async () => {
    expect.assertions(2);
    await fetchItem('MLB1615760527');
    const url = 'https://api.mercadolibre.com/items/MLB1615760527';
    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith(url);
  });
  test('Verifica se a estrutura é igual a /item/ quando passado o argumento /MLB1615760527/', async () => {
    expect(fetchItem('MLB1615760527')).resolves.toEqual(item);
  });
  test('Verifica se a mensagem de erro aparece ao não passar argumento', async () => {
    await expect(fetchItem()).resolves.toThrow(new Error('You must provide an url'));
  });
});
