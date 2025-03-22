import { Component, OnInit } from "@angular/core";
import { TodoItem } from "../../../../core/domain/todo/todo-item.model";
import { CreateTodoUseCase } from "../../../../core/application/todo/create-todo.usecase";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { TodoItemComponent } from "../todo-item/todo-item.component";
import { DeleteTodoUseCase } from "../../../../core/application/todo/delete-todo.usecase";
import { UpdateTodoUseCase } from "../../../../core/application/todo/update-todo.usecase";
import { GetAllTodosUseCase } from "../../../../core/application/todo/get-all-todos.usecase";
import { TodoFilter } from "../../../../core/domain/todo/todo-filter.enum";
import { ThemeToggleComponent } from "../../../../../shared/components/theme-toggle/theme-toggle.component";

@Component({
    selector: 'app-todo-list',
    standalone: true,
    imports: [CommonModule, FormsModule, TodoItemComponent, ThemeToggleComponent],
    templateUrl: './todo-list.page.html',
    styleUrls: ['./todo-list.page.scss']
})
export class TodoListPage implements OnInit {

    todos: TodoItem[] = [];
    newTodoText: string = '';
    selectedFilter = TodoFilter.All;
    filterOptions = Object.values(TodoFilter);

    constructor(
        private getTodoListUseCase: GetAllTodosUseCase,
        private createTodoUseCase: CreateTodoUseCase,
        private deleteTodoUseCase: DeleteTodoUseCase, 
        private updateTodoUseCase: UpdateTodoUseCase
    ) {}

    ngOnInit() {
        this.loadTodos();
    }

    loadTodos() {
        this.getTodoListUseCase.execute().subscribe(items => (this.todos = items));
    }

    create(): void {
        const text = this.newTodoText.trim();
        if (!text) return;
        this.createTodoUseCase.execute(this.newTodoText.trim()).subscribe({
            next: () => {
                this.loadTodos();
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

    get filteredTodos(): TodoItem[] {
        if (this.selectedFilter === TodoFilter.All) return this.todos;
        const showCompleted = this.selectedFilter === TodoFilter.Completed;
        return this.todos.filter(todo => todo.completed === showCompleted);
    }
    
}