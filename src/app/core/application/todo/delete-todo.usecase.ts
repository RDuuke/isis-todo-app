import { Inject, Injectable } from "@angular/core";
import { TODO_REPOSITORY_TOKEN } from "../../domain/todo/todo.tokens";
import { TodoRepository } from "../../domain/todo/todo.repository";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class DeleteTodoUseCase {

    constructor(@Inject(TODO_REPOSITORY_TOKEN) private repository: TodoRepository) {}

    execute(id: number): Observable<any> {
        return this.repository.delete(id);
    }
}