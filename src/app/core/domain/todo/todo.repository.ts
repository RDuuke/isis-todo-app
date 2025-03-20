import { Observable } from "rxjs";
import { TodoItem } from "./todo-item.model";

export interface TodoRepository {
    create(todoItem: Partial<TodoItem>): Observable<TodoItem>;
}
