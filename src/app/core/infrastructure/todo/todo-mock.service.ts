import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TodoRepository } from '../../domain/todo/todo.repository';
import { TodoItem } from '../../domain/todo/todo-item.model';

@Injectable({
  providedIn: 'root'
})
export class TodoMockService implements TodoRepository {
  private todos: TodoItem[] = [];
  private id_counter = 1;

 
    create(todoItem: Partial<TodoItem>): Observable<TodoItem> {
        const newTodo: TodoItem = {
        id: this.id_counter++,
        text: todoItem.text || '',
        completed: todoItem.completed || false
        };
        this.todos.push(newTodo);
        return of(newTodo);
    }

    get(): Observable<TodoItem[]> {
        return of(this.todos);
    }
}
