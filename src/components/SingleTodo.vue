<template>
  <div
    :class="[
      'oneTodo',
      { school: isPurple },
      { other: isRed },
      { shopping: isOrange },
      { travel: isGreen },
    ]"
  >
    <span>{{ shownTodo.text }}</span>
    <div class="toggles">
      <input
        type="checkbox"
        name="checkbox"
        :checked="shownTodo.done"
        @click="changeState"
      />
      <span @click="removeTodo">X</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { Todo } from "../models/Todo";
import { Prop } from "vue-property-decorator";

export default class SingleTodo extends Vue {
  @Prop() shownTodo!: Todo;
  isPurple = false;
  isRed = false;
  isOrange = false;
  isGreen = false;

  mounted() {
    if (this.shownTodo.category === "School") {
      this.isPurple = true;
    }
    if (this.shownTodo.category === "Other") {
      this.isRed = true;
    }
    if (this.shownTodo.category === "Shopping") {
      this.isOrange = true;
    }
    if (this.shownTodo.category === "Travel") {
      this.isGreen = true;
    }
  }

  changeState() {
    this.$emit("changeState", this.shownTodo);
  }

  removeTodo() {
    this.$emit("removeTodo", this.shownTodo);
  }
}
</script>

<style scoped lang="scss">
@import "../assets/style/_mixins.scss";
.oneTodo {
  @include for-tablet-landscape-up {
    width: 500px;
  }

  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 75%;
  height: 40px;
  background-color: white;
  margin: 8px;
  padding: 4px 20px 4px 20px;
  border-radius: 4px;

  .toggles {
    display: flex;
    justify-content: space-between;
    width: 40px;
    input:checked {
      background-color: pink;
    }
  }
}

.school {
  border: 2px solid orchid;
}
.other {
  border: 2px solid red;
}
.shopping {
  border: 2px solid orange;
}
.travel {
  border: 2px solid green;
}
</style>
