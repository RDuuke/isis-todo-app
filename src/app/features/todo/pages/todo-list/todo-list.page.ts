import { Component, OnInit } from "@angular/core";
import { TodoItem } from "../../../../core/domain/todo/todo-item.model";
import { CreateTodoUseCase } from "../../../../core/application/todo/create-todo.usecase";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { TodoItemComponent } from "../todo-item/todo-item.component";
import { DeleteTodoUseCase } from "../../../../core/application/todo/delete-todo.usecase";
import { UpdateTodoUseCase } from "../../../../core/application/todo/update-todo.usecase";

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
        private createTodoUseCase: CreateTodoUseCase,
        private deleteTodoUseCase: DeleteTodoUseCase, 
        private updateTodoUseCase: UpdateTodoUseCase
    ) {}

    create(): void {
        if (!this.newTodoText.trim()) return;
        this.createTodoUseCase.execute(this.newTodoText.trim()).subscribe({
            next: (newTodo) => {
                this.todos.push(newTodo);
                this.newTodoText = '';
          },
          error: (err) => console.error('Error al crear TODO:', err)
        });
    }

    delete(todo: TodoItem): void {
        this.deleteTodoUseCase.execute(todo.id).subscribe({
          next: () => this.todos = this.todos.filter(t => t.id !== todo.id),
          error: err => console.error('Error eliminando TODO:', err)
        });
    }
    
    update(todo: TodoItem): void {
        this.updateTodoUseCase.execute(todo).subscribe(updated => {
          const i = this.todos.findIndex(t => t.id === updated.id);
          if (i > -1) this.todos[i] = updated;
        });
    }
}