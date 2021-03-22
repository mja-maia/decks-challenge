<template>
   <div class="new-deck-container">
    <Header :title="'Cards'"/>
    <div class="form-container">
      <div class="form">
        <Input v-for="(card, index) in 10" v-model="cards[index]"
        :key="card.name" :name="index" :label="`Card ${parseInt(index) + 1}`"/>
      </div>

      <div class="rotation-container">
        <h1>Rotation Card</h1>
        <div class="rotation-input">
          <Input :name="'rotationCard'" @input="handleRotationCard"/>
        </div>
      </div>

      <div class="button-container">
        <Button
          :disabled="loading"
          :onClick="handleSubmit"> {{loading ? 'Loading...' : 'Submit'}} </Button>
      </div>
    </div>
   </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import Header from '../components/Header.vue';
import Input from '../components/Input.vue';
import Button from '../components/Button.vue';

@Component({
  components: {
    Header,
    Input,
    Button,
  },
  computed: {
    ...mapGetters({
      deckId: 'deckId',
      loading: 'loading',
    }),
  },
})

export default class NewDeck extends Vue {
  private cards = []

  protected deckId!: string

  protected loading!: boolean

  private rotationCard = ''

  handleRotationCard = (value: string) => {
    this.rotationCard = value;
  }

  handleSubmit = async () => {
    const cards = this.cards.filter((card) => !!card);

    this.$store.dispatch('createDeck', {
      cards,
      rotationCard: this.rotationCard,
    }).then(() => {
      this.$router.push({ name: 'OrderedPile', params: { deckId: `${this.$store.getters.deckId}` } });
    });
  }
}
</script>

<style scoped>
.new-deck-container{
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.form-container{
  background-color: #DFF4F7;
  flex: 2;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.form{
  margin-top: 50px;

  display: grid;
  justify-content: center;
  grid-template-columns: repeat(auto-fill, 232px);
  grid-gap: 50px;
}

.rotation-container{
  margin-top: 70px;

  display: flex;
  justify-content: center;
  align-items: center;
}

.rotation-input{
  margin-left: 25px;
  width: 232px;
}

.button-container{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
}

@media(max-width: 425px){
  .rotation-container{
    flex-direction: column;
    margin-bottom: 50px;
  }
}
</style>
