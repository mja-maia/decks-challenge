function isValidCard(card: string) {
  const exp = new RegExp('([2-9JQKA]|10)(H|S|D|C)', 'g');
  return exp.test(card);
}
function isValidPile(pile: string[]) {
  return pile.every(isValidCard);
}
function generateScore(cardElements: string[], rotationItem: string): {} {
  const size = cardElements.length;
  let index = cardElements.findIndex((cardElement) => rotationItem === cardElement);
  const scoreMap = {} as any;
  for (let i = size; i >= 1; i -= 1) {
    const position = index % size;
    const key = cardElements[position];
    scoreMap[key] = i;
    index += 1;
  }
  return scoreMap;
}
export function getSuit(card: string) {
  const exp = new RegExp('([2-9JQKA]|10)(H|S|D|C)', 'g');
  return exp.exec(card)![2];
}

export function getValue(card: string) {
  const exp = new RegExp('([2-9JQKA]|10)(H|S|D|C)', 'g');
  return exp.exec(card)![1];
}
function combineCards(
  occurrences: string[],
  sizeCombination: number,
  combinationCards: string[][],
) {
  const result: string[] = new Array(sizeCombination);
  function combine(
    input: string[],
    len: number,
    start: number,
    combinationResult: string[][],
  ): string[] {
    if (len === 0) {
      combinationResult.push([...result]);
      return result;
    }
    for (let i = start; i <= input.length - len; i += 1) {
      result[result.length - len] = input[i];
      combine(input, len - 1, i + 1, combinationResult);
    }
    return [];
  }
  combine(occurrences, sizeCombination, 0, combinationCards);
}
function combination(cards: string[], size: number) {
  const combinationCards: string[][] = [];
  combineCards(cards, size, combinationCards);
  return combinationCards;
}
function SortDeck(rotationCard: string, pileParam: string[] = []) {
  const pile = [...pileParam];
  const suits = [
    'H',
    'D',
    'C',
    'S',
  ];

  const values = [
    '2',
    'A',
    'K',
    'Q',
    'J',
    '10',
    '9',
    '8',
    '7',
    '6',
    '5',
    '4',
    '3',
  ];

  if (!rotationCard || pile.length === 0) {
    throw new Error('Invalid arguments.');
  }
  if (!isValidCard(rotationCard)) {
    throw new Error('Rotation card is not valid.');
  }
  if (!isValidPile(pile)) {
    throw new Error('Pile is not valid.');
  }
  const valuesScore: any = generateScore(values, rotationCard[0]);
  const suitsScore: any = generateScore(suits, rotationCard[1]);

  function compareCard(prevCard: string, currCard: string) {
    const prevSuit = getSuit(prevCard);
    const currSuit = getSuit(currCard);

    if (prevSuit !== currSuit) {
      if (suitsScore[prevSuit] > suitsScore[currSuit]) {
        return -1;
      }
      if (suitsScore[prevSuit] < suitsScore[currSuit]) {
        return 1;
      }
    } else {
      const prevValue = getValue(prevCard);
      const currValue = getValue(currCard);
      if (valuesScore[prevValue] > valuesScore[currValue]) {
        return -1;
      }
      if (valuesScore[prevValue] < valuesScore[currValue]) {
        return 1;
      }
    }
    return 0;
  }

  function mapCardValueOccurrences() {
    const occurrences = pile.reduce((acc: any, curr: string) => {
      const cardValue = getValue(curr);
      if (typeof acc[cardValue] === 'undefined') {
        acc[cardValue] = [curr];
      } else {
        acc[cardValue] = [...acc[cardValue], curr];
      }
      return acc;
    }, {} as any);
    return occurrences;
  }

  function ordenatePile() {
    return pile.sort(compareCard);
  }

  const orderedPile = ordenatePile();
  const highCard = orderedPile[0];
  const cardValueOccurrences = mapCardValueOccurrences();

  function groupByCombination(cardOccurrences: string[][]) {
    return cardOccurrences.reduce((acc: {3: string[][]; 2: string[][]}, curr) => {
      if (curr.length >= 3) {
        acc[3].push(...combination(curr, 3));
        acc[2].push(...combination(curr, 2));
      } else if (curr.length === 2) {
        acc[2] = [...acc[2], curr];
      }
      return acc;
    }, { 3: [], 2: [] });
  }

  debugger;
  const groupCombinationCards = groupByCombination(Object.values(cardValueOccurrences));
  const fullHouse: string[][] = [];
  groupCombinationCards[3].forEach((combinationThree: string[]) => {
    groupCombinationCards[2]
      .filter((combinationTwo) => getValue(combinationThree[0]) !== getValue(combinationTwo[0]))
      .forEach((combinationTwo: string[]) => {
        fullHouse.push([...combinationThree, ...combinationTwo].sort());
      });
  });

  return {
    orderedPile,
    highCard,
    fullHouse,
  };
}

export default SortDeck;
