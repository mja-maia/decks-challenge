<template>
    <div class="card-container">
      <div class="regular-card-content">
        <div class="card-value">
          {{this.getValue()}}
        </div>
        <div class="card-suit">
          <img :src="require(`../assets/${this.getSuit()}.png`)" alt="suit" width="20">
        </div>
      </div>
      <div class="reverse-card-content">
        <div class="card-value">
          {{this.getValue()}}
        </div>
        <div class="card-suit">
          <img :src="require(`../assets/${this.getSuit()}.png`)" alt="suit" width="20">
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { getSuit, getValue } from '../services/cards';

@Component({})
export default class Card extends Vue {
  @Prop() private card!: string

  getSuit() {
    return getSuit(this.card);
  }

  getValue() {
    return getValue(this.card);
  }
}
</script>

<style scoped>
  .card-container{
    width: 120px;
    height: 200px;
    border-radius: 8px;
    background-color: #fff;
    font-size: 32px;
    font-weight: bold;
    padding: 10px 16px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .regular-card-content{
    display: flex;
    justify-content: flex-start;
  }

  .reverse-card-content{
    display: flex;
    justify-content: flex-start;
    transform: rotate(180deg);
  }

  .card-suit{
    margin-left: 8px;
    margin-top: 1px;
  }
</style>
