<template>
  <form @submit.prevent="" class="createTodo">
    <span class="errorMessage" v-if="isError">{{ errorMsg }}</span>
    <ul class="category">
      <li id="shopping">
        <input
          type="radio"
          id="shoppingCheck"
          name="category"
          value="Shopping"
          v-model="category"
          required
        />
        <label for="shoppingCheck">Shopping</label>
      </li>
      <li id="travel">
        <input
          type="radio"
          id="travelCheck"
          name="category"
          value="Travel"
          v-model="category"
        />
        <label for="travelCheck">Travel</label>
      </li>
      <li id="school">
        <input
          type="radio"
          id="schoolCheck"
          name="category"
          value="School"
          v-model="category"
        />
        <label for="schoolCheck">School</label>
      </li>
      <li id="other">
        <input
          type="radio"
          id="otherCheck"
          name="category"
          value="Other"
          v-model="category"
        />
        <label for="otherCheck">Other</label>
      </li>
    </ul>
    <div class="main-input">
      <input
        class="description"
        type="text"
        name="description"
        placeholder="Write a task..."
        v-model="description"
        @keypress.enter="createTodo"
      />

      <button type="button" @click="createTodo">Add</button>
    </div>
  </form>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { Todo } from "../models/Todo";
import { Guid } from "js-guid";

export default class AddTodo extends Vue {
  description = "";
  category = "";
  errorMsg = "";
  isError = false;

  createTodo() {
    if (
      this.description.length > 0 &&
      this.description.length <= 15 &&
      this.category.length > 0
    ) {
      let id: Guid = Guid.newGuid();
      let newTodo = new Todo(
        this.description,
        id.toString(),
        this.category,
        new Date()
      );
      this.isError = false;
      this.description = "";
      this.$emit("makeTodo", newTodo);
    } else if (this.description.length > 15) {
      this.isError = true;
      this.errorMsg = "You're doing to much!";
    } else if (this.description.length === 0 && this.category.length === 0) {
      this.isError = true;
      this.errorMsg = "Choose everything!";
    } else if (this.description.length === 0) {
      this.isError = true;
      this.errorMsg = "You have to write something!";
    } else if (this.category.length === 0) {
      this.isError = true;
      this.errorMsg = "You have to choose a category!";
    }
  }
}
</script>

<style scoped lang="scss">
@import "../assets/style/_mixins.scss";
.createTodo {
  @include for-tablet-landscape-up {
    width: 700px;
  }
  display: flex;
  flex-direction: column;
  background-color: #ffefc7;
  width: 95%;
  margin: 20px;
  .errorMessage {
    background-color: rgb(223, 74, 74);
    color: #ffefc7;
    border-radius: 4px;
    width: 250px;
    text-align: center;
    padding: 2px;
    margin-bottom: 10px;
  }
  .main-input {
    display: flex;
    justify-content: space-between;
    height: 40px;
    border-radius: 0px 0px 0px 0px;
    .description {
      border-left: 1.5px solid blue;
      border-top: none;
      border-right: 1.5px solid blue;
      border-bottom: 1.5px solid blue;
      background-color: transparent;
      border-right: 1px solid rgb(220, 220, 220);
      border-radius: 0px 0px 0px 4px;
      padding-left: 10px;
      width: 70%;
    }
    button {
      border: none;
      background-color: blue;
      color: #ffefc7;
      padding: 0;
      text-transform: uppercase;
      border-left: 1.5px solid blue;
      border-bottom-right-radius: 4px;
      width: 30%;
    }
    button:hover {
      cursor: pointer;
    }
  }

  .category {
    padding: 0;
    list-style: none;
    display: flex;
    justify-content: space-between;
    position: relative;
    background-color: #ffefc7;
    border: none;
    margin: 0;
    border-left: 1.5px solid blue;
    border-bottom: none;
    border-right: 1.5px solid blue;
    border-top: 1.5px solid blue;
    border-radius: 4px 4px 0px 0px;

    li {
      float: left;
      height: 40px;
      width: 25%;
      position: relative;
      text-align: center;
    }

    label,
    input {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }

    input[type="radio"] {
      opacity: 0.01;
      z-index: 100;
    }

    input[type="radio"]:checked + label,
    .Checked + label {
      font-weight: bold;
    }

    label {
      padding: 5px;
      cursor: pointer;
      z-index: 90;
    }

    label:hover {
      font-weight: bold;
    }

    #shopping {
      background-color: rgb(233, 172, 58);
      border-top-left-radius: 4px;
    }
    #travel {
      background-color: rgb(81, 142, 81);
    }
    #school {
      background-color: orchid;
    }
    #other {
      background-color: rgb(244, 112, 112);
      border-top-right-radius: 4px;
    }
  }
}
</style>
