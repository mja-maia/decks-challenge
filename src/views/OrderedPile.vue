<template>
  <div>
    <Header :title="'Ordered Pile'"/>
    <div v-if="!error" class="ordered-pile-container">
      <section class="cards">
        <Card :card="card" v-for="card in orderedPile" :key="card.code" />
      </section>
      <section class="result">
        <div class="high-card">
          <label for=">High Card" class="text-label">High Card:</label> {{ highCard }}
        </div>
        <div>
          <label for="highCard" class="text-label"
            >Full House Combo:
            <span class="text-span" v-if="fullHouseCombination.length === 0">None</span></label
          >
          <div class="full-house-combinations" v-if="fullHouseCombination.length > 0">
            <span v-for="cards in fullHouseCombination" :key="cards">{{ cards.join(", ") }}</span>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import Header from '../components/Header.vue';
import Input from '../components/Input.vue';
import Button from '../components/Button.vue';
import Card from '../components/Card.vue';

interface Cards {
  fullHouse: string[][];
  orderedPile: string[];
  highCard: string;
}

interface CardImage {
  code: string;
  image: string;
  images: {
    png: string;
    svg: string;
  };
  suit: string;
  value: string;
}

@Component({
  components: {
    Header,
    Input,
    Button,
    Card,
  },
  computed: {
    ...mapGetters({
      deck: 'deck',
      error: 'error',
      loading: 'loading',
      cardsImages: 'cardsImages',
    }),
  },
})
export default class OrderedPile extends Vue {
  private orderedPile = [] as string[];

  private cardsImages!: CardImage[];

  private highCard = '';

  private fullHouseCombination = [] as string[][];

  protected deckId!: string;

  protected loading!: boolean;

  protected error!: string;

  mounted() {
    try {
      const { deckId } = this.$route.params;
      this.$store.dispatch('sortDeck', deckId).then((res: Cards) => {
        this.fullHouseCombination = res.fullHouse;
        this.highCard = res.highCard;
        this.orderedPile = res.orderedPile;
      });
    } catch (error) {
      console.error(error);
    }
  }
}
</script>

<style scoped>
.ordered-pile-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cards {
  margin-top: 50px;
  border: #999999 1px solid;
  background-color: #d8d8d8;
  padding: 20px;
  width: 850px;

  display: grid;
  grid-template-columns: repeat(auto-fill, 232px);
  grid-gap: 50px;
  justify-content: center;
  justify-items: center;
}

.result {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  margin-top: 20px;
  font-size: 25px;
}
.text-label {
  font-weight: bold;
}
.text-span {
  font-weight: normal;
}

.high-card {
  margin-bottom: 10px;
}

.full-house-combinations {
  display: flex;
  flex-direction: column;
}

@media(max-width: 900px){
  .cards{
    width: 90%;
  }
}
</style>
