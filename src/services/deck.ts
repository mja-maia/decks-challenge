import api from './api';

interface DeckResponse {
  success: boolean;
  deck_id: string;
  shuffled: boolean;
  remaining: number;
}

interface PileResponse {
  success: boolean;
  deck_id: string;
  remaining: number;
  piles: object;
}

interface CardImages {
  svg: string;
  png: string;
}

interface Card {
  code: string;
  image: string;
  images: CardImages;
  value: string;
  suit: string;
}

function DeckService() {
  async function brandNewDeck(): Promise<DeckResponse> {
    try {
      const response = await api.get('new');
      return response.data;
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  }

  async function addPiles(id: string, cards: string[]): Promise<PileResponse> {
    try {
      const response = await api.get(
        `${id}/pile/deckchallange/add/?cards=${cards.join(',')}`,
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  }

  return {
    brandNewDeck,
    addPiles,
  };
}

export default DeckService();
