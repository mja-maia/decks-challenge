<template>
    <button @click="onClick">
      <slot/>
    </button>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class Button extends Vue {
  @Prop() private onClick!: () => void
}
</script>

<style scoped>
  button{
    border-radius: 8px;
    width: 100%;
    height: 50px;
    outline: none;
    border: none;
    color: #FBE500;
    background-color: #1C0063;
    font-size: 28px;
    font-weight: bold;
    width: 177px;
  }
</style>
