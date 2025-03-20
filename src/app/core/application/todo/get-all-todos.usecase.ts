import { Inject, Injectable } from "@angular/core";
import { TODO_REPOSITORY_TOKEN } from "../../domain/todo/todo.tokens";
import { TodoRepository } from "../../domain/todo/todo.repository";
import { Observable } from "rxjs";
import { TodoItem } from "../../domain/todo/todo-item.model";

@Injectable({
    providedIn: 'root'
})
export class GetAllTodosUseCase {
    constructor(@Inject(TODO_REPOSITORY_TOKEN) private repository: TodoRepository) {}

    execute() : Observable<TodoItem[]> {
        return this.repository.get();
    }
}