import { Inject, Injectable } from "@angular/core";
import { TodoRepository } from "../../domain/todo/todo.repository";
import { firstValueFrom } from "rxjs";
import { TodoItem } from "../../domain/todo/todo-item.model";
import { TODO_REPOSITORY_TOKEN } from "../../domain/todo/todo.tokens";

@Injectable({
    providedIn: 'root'
})
export class CreateTodoUseCase {
    constructor(@Inject(TODO_REPOSITORY_TOKEN) private repository: TodoRepository) {}

    async execute(todo: Partial<TodoItem>): Promise<TodoItem> {
        console.log('Creating todo:', todo);
        if (!todo.text || !todo.text.trim()) {
            throw new Error('Text cannot be empty');
        }
        return firstValueFrom(this.repository.create(todo));
    }

}

