<template>
  <Todos />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Todos from "./components/Todos.vue";

@Options({
  components: {
    Todos,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
@import "./assets/style/_mixins.scss";

html {
  background-color: #ffefc7;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 60px;
}
</style>
