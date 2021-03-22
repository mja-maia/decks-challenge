<template>
  <div class="input-container">
    <label :for="name">{{ label }}</label>
    <input
      :id="name"
      type="text"
      :name="name"
      placeholder="Enter card"
      @input="handleInputChange($event.target.value)"
      :value="value"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class Input extends Vue {
  @Prop() private label!: string;

  @Prop() private name!: string;

  @Prop() private value!: string;

  public handleInputChange(value: string): void{
    this.$emit('input', value);
  }
}
</script>

<style scoped>
.input-container {
  min-width: 100%;

  display: flex;
  flex-direction: column;
}

label {
  text-align: left;
  color: #b1b1b1;
  font-weight: bold;
  margin-bottom: 10px;
}

input {
  border-radius: 6px;
  border: 1px solid #ced2e0;
  outline: none;
  height: 37px;
}

::placeholder {
  color: #c9c9c9;
}
</style>
