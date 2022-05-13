import { Guid } from "js-guid";

export class Todo {
  done: boolean;
  constructor(
    public text: string,
    public todoId: string,
    public category: string,
    public created: Date
  ) {
    this.done = false;
  }
}
