import { Component, OnInit } from "@angular/core";
import { TodoItem } from "../../../../core/domain/todo/todo-item.model";
import { CreateTodoUseCase } from "../../../../core/application/todo/create-todo.usecase";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { TodoItemComponent } from "../todo-item/todo-item.component";

@Component({
    selector: 'app-todo-list',
    standalone: true,
    imports: [CommonModule, FormsModule, TodoItemComponent],
    templateUrl: './todo-list.page.html',
    styleUrls: ['./todo-list.page.scss']
})
export class TodoListPage {

    todos: TodoItem[] = [];
    newTodoText: string = '';

    constructor(
        private createTodoUseCase: CreateTodoUseCase
    ) {}

    createTodo(): void {
        if (!this.newTodoText.trim()) return;
        this.createTodoUseCase.execute(this.newTodoText.trim()).subscribe({
            next: (newTodo) => {
                this.todos.push(newTodo);
                this.newTodoText = '';
          },
          error: (err) => console.error('Error al crear TODO:', err)
        });
    }
    
}