import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import DeckService from '../services/deck';
import Cards from '../services/cards';
import types from './mutation-types';

Vue.use(Vuex);
interface Deck {
  rotationCard: string;
  cards: string[];
}
interface Decks {
  [deckId: string]: Deck;
}
interface Store {
  decks: Decks;
  loading: boolean;
  lastDeckId: string;
  error: string;
}

export default new Vuex.Store<Store>({
  state: {
    decks: {},
    loading: false,
    lastDeckId: '',
    error: '',
  },
  getters: {
    deckId: (state) => state.lastDeckId,
    deck: (state) => (deckId: string) => state.decks[deckId],
    loading: (state) => state.loading,
    error: (state) => state.error,
  },
  mutations: {
    [types.CREATE_DECK_REQUEST](state) {
      state.loading = true;
      state.error = '';
    },
    [types.CREATE_DECK_SUCCESS](state, payload) {
      state.loading = false;
      state.decks[payload.deckId] = {
        rotationCard: payload.rotationCard,
        cards: payload.cards,
      };
      state.lastDeckId = payload.deckId;
    },
    [types.CREATE_DECK_FAILURE](state, error) {
      state.loading = false;
      state.error = error;
    },
    [types.SORT_DECK_REQUEST](state) {
      state.loading = true;
      state.error = '';
    },
    [types.SORT_DECK_SUCCESS](state) {
      state.loading = false;
    },
    [types.SORT_DECK_FAILURE](state, error) {
      state.loading = false;
      state.error = error;
    },
  },
  actions: {
    async createDeck({ commit }, { cards, rotationCard }: Deck) {
      try {
        commit(types.CREATE_DECK_REQUEST);
        const deck = await DeckService.brandNewDeck();
        await DeckService.addPiles(deck.deck_id, cards);
        commit(types.CREATE_DECK_SUCCESS, {
          deckId: deck.deck_id,
          cards,
          rotationCard,
        });
      } catch (error) {
        commit(types.CREATE_DECK_FAILURE, 'Error create game');
        console.error(error);
        throw error;
      }
    },
    async sortDeck({ commit, state }, deckId: string) {
      try {
        commit(types.SORT_DECK_REQUEST);
        const deck = state.decks[deckId];
        if (deck) {
          const { rotationCard, cards } = deck;
          const { fullHouse, highCard, orderedPile } = Cards(rotationCard, cards);
          commit(types.SORT_DECK_SUCCESS);
          return {
            fullHouse,
            highCard,
            orderedPile,
          };
        }
        throw new Error('Deck not exist');
      } catch (error) {
        commit(types.SORT_DECK_FAILURE, 'Error to sort deck');
        console.error(error);
        throw error;
      }
    },
  },
  plugins: [new VuexPersistence().plugin],
  modules: {
  },
});
