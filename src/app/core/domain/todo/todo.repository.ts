import { Observable } from "rxjs";
import { TodoItem } from "./todo-item.model";

export interface TodoRepository {
    
    get(): Observable<TodoItem[]>;

    create(todoItem: Partial<TodoItem>): Observable<TodoItem>;

    delete(id: number): Observable<any>;

    update(todo: TodoItem): Observable<TodoItem>;

}
