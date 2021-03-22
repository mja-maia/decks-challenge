<template>
  <div class="header-container">
    <h1>{{title}}</h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class Header extends Vue {
  @Prop() private title!: string
}
</script>

<style scoped>
.header-container{
  background-color: #1F7101;
  max-height: 140px;
  min-height: 103px;

  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

h1{
  color: #FBE500;
  margin: 0;
  padding: 0;
  font-size: 50px;
}
</style>
