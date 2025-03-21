import { Inject, Injectable } from "@angular/core";
import { TODO_REPOSITORY_TOKEN } from "../../domain/todo/todo.tokens";
import { TodoRepository } from "../../domain/todo/todo.repository";
import { TodoItem } from "../../domain/todo/todo-item.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UpdateTodoUseCase {
    
    constructor(@Inject(TODO_REPOSITORY_TOKEN) private repository: TodoRepository) {}

    execute(todo: TodoItem): Observable<TodoItem> {
        return this.repository.update(todo);
    }
}