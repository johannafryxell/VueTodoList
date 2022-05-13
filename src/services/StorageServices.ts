import { Todo } from "@/models/Todo";

export class StorageService {
  setStorage(list: Todo[]) {
    localStorage.setItem("taskList", JSON.stringify(list));
  }

  getStorage() {
    const todoList: Todo[] = JSON.parse(
      localStorage.getItem("taskList") || "[]"
    );

    return todoList;
  }
}
