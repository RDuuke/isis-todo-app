import { Inject, Injectable } from "@angular/core";
import { TodoRepository } from "../../domain/todo/todo.repository";
import { Observable } from "rxjs";
import { TodoItem } from "../../domain/todo/todo-item.model";
import { TODO_REPOSITORY_TOKEN } from "../../domain/todo/todo.tokens";

@Injectable({
    providedIn: 'root'
})
export class CreateTodoUseCase {
    constructor(@Inject(TODO_REPOSITORY_TOKEN) private repository: TodoRepository) {}

    execute(text: string): Observable<TodoItem> {
        if (!text.trim()) {
            throw new Error('Text cannot be empty');
        }

        return this.repository.create({ text, completed: false });
    }

}

