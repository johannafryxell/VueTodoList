<template>
  <div class="sortTodos">
    <span>Sort by:</span>
    <div class="sortCategory">
      <Select @change="chooseCompleted($event)" id="status">
        <option disabled selected>Status</option>
        <option>Done</option>
        <option>Not done</option>
      </Select>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue } from "vue-class-component";
export default class SortTodos extends Vue {
  chooseCompleted(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.$emit("chooseComplete", target.value);
  }
}
</script>
<style lang="scss" scoped>
.sortTodos {
  color: black;
  display: flex;
  column-gap: 10px;
  margin: 10px 0px 20px 0px;
  span {
    font-weight: bold;
  }

  .sortCategory {
    Select {
      font-family: Avenir, Helvetica, Arial, sans-serif;
    }
    select {
      background-color: transparent;
      text-align: center;
      border: none;
    }
  }
}
</style>
