import CardService from '../../src/services/cards';

describe('return ordered pile and high card', () => {
  it('User Input - Cards: AS, AD, AC, KH, KS and Rotation Card: 2H', () => {
    const expectedOrderedPile = ['KH', 'AD', 'AC', 'AS', 'KS'];
    const expectedHighCard = 'KH';
    const expectedFullHouses = [
      ['AD', 'AC', 'AS', 'KH', 'KS'],
    ];
    const expectedFullHousesOrdened = expectedFullHouses.map((e) => e.sort()).sort();
    const cardService = CardService('2H', ['AS', 'AD', 'AC', 'KH', 'KS']);
    expect(expectedOrderedPile).toEqual(cardService.orderedPile);
    expect(expectedHighCard).toEqual(cardService.highCard);
    expect(expectedFullHousesOrdened).toEqual(cardService.fullHouse.map((e) => e.sort()).sort());
  });
  it('User Input - Cards:  2H, 2D, 2C, 2S, 3H, 3D, 3C and Rotation Card: 2H', () => {
    const expectedOrderedPile = ['2H', '3H', '2D', '3D', '2C', '3C', '2S'];
    const expectedHighCard = '2H';
    const expectedFullHouses = [
      ['2H', '2D', '2C', '3H', '3D'],
      ['2H', '2D', '2C', '3H', '3C'],
      ['2H', '2D', '2C', '3D', '3C'],
      ['2H', '2D', '2S', '3H', '3D'],
      ['2H', '2D', '2S', '3H', '3C'],
      ['2H', '2D', '2S', '3D', '3C'],
      ['2H', '2C', '2S', '3H', '3D'],
      ['2H', '2C', '2S', '3H', '3C'],
      ['2H', '2C', '2S', '3D', '3C'],
      ['2D', '2C', '2S', '3H', '3D'],
      ['2D', '2C', '2S', '3H', '3C'],
      ['2D', '2C', '2S', '3D', '3C'],
      ['2H', '2D', '3H', '3D', '3C'],
      ['2H', '2C', '3H', '3D', '3C'],
      ['2H', '2S', '3H', '3D', '3C'],
      ['2D', '2C', '3H', '3D', '3C'],
      ['2D', '2S', '3H', '3D', '3C'],
      ['2C', '2S', '3H', '3D', '3C'],
    ];

    const expectedFullHousesOrdened = expectedFullHouses.map((e) => e.sort()).sort();

    const cardService = CardService('2H', ['2H', '2D', '2C', '2S', '3H', '3D', '3C']);
    expect(expectedOrderedPile).toEqual(cardService.orderedPile);
    expect(expectedHighCard).toEqual(cardService.highCard);
    expect(expectedFullHousesOrdened).toEqual(cardService.fullHouse.map((e) => e.sort()).sort());
  });
});

describe('Game', () => {
  it('throw on game when is not valid rotation card ', () => {
    expect(() => {
      CardService('2', ['2H']);
    }).toThrow();
  });
  it('throw on game when is not valid pile ', () => {
    expect(() => {
      CardService('2Q', ['A']);
    }).toThrow();
  });
});
