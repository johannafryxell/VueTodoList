<template>
  <div class="showTodos">
    <div class="img-wrapper">
      <img src="../assets/checklist.png" alt="checklist" />
    </div>
    <AddTodo @makeTodo="addTodo($event)" :todos="todoList" />
    <SortTodos v-if="hasTodos" @chooseComplete="chooseComp($event)" />
    <SingleTodo
      @removeTodo="deleteTodo($event)"
      @changeState="changeTodo($event)"
      v-for="t in todoList"
      :key="t.todoId"
      :shownTodo="t"
    />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Todo } from "../models/Todo";
import AddTodo from "./AddTodo.vue";
import SingleTodo from "./SingleTodo.vue";
import { StorageService } from "../services/StorageServices";
import SortTodos from "./SortTodos.vue";

@Options({
  components: {
    SingleTodo,
    AddTodo,
    SortTodos,
  },
})
export default class Todos extends Vue {
  service = new StorageService();
  todoList: Todo[] = [];
  hasTodos = false;

  mounted() {
    this.todoList = this.service.getStorage();
    if (this.todoList.length > 0) {
      this.hasTodos = true;
    }
  }

  addTodo(createdTodo: Todo) {
    this.todoList.push(createdTodo);
    this.service.setStorage(this.todoList);

    this.hasTodos = true;
  }

  changeTodo(changedTodo: Todo) {
    changedTodo.done = !changedTodo.done;
    this.service.setStorage(this.todoList);
  }

  deleteTodo(chosenTodo: Todo) {
    for (let i = 0; i < this.todoList.length; i++) {
      if (chosenTodo.todoId == this.todoList[i].todoId) {
        this.todoList.splice(i, 1);
      }
    }
    this.service.setStorage(this.todoList);
    if (this.todoList.length < 1) {
      this.hasTodos = false;
    }
  }

  chooseComp(completed: string) {
    if (completed === "Done") {
      this.todoList.sort(function (x, y) {
        return x.done === y.done ? 0 : x.done ? -1 : 1;
      });
    } else if (completed === "Not done") {
      this.todoList.sort(function (x, y) {
        return x.done === y.done ? 0 : x.done ? 1 : -1;
      });
    }
  }
}
</script>

<style lang="scss">
@import "../assets/style/_mixins.scss";
.showTodos {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .img-wrapper {
    width: 140px;
    img {
      width: 100%;
    }
  }
}
</style>
