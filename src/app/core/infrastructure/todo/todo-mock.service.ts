import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { TodoRepository } from '../../domain/todo/todo.repository';
import { TodoItem } from '../../domain/todo/todo-item.model';

@Injectable({
  providedIn: 'root'
})
export class TodoMockService implements TodoRepository {
  private todos: TodoItem[] = [];
  private id_counter = 1;

 
    create(todo: Partial<TodoItem>): Observable<TodoItem> {
        const newTodo: TodoItem = {
        id: this.id_counter++,
        text: todo.text || '',
        completed: todo.completed || false,
        dueDate: todo.dueDate || undefined
        };
        this.todos.push(newTodo);
        return of(newTodo).pipe(delay(500)); 
    }

    get(): Observable<TodoItem[]> {
        return of(this.todos).pipe(delay(1000)); // Simulate network delay
    }

    delete(id: number): Observable<any> {
      this.todos = this.todos.filter(t => t.id !== id);
      return of({ success: true });
    }

    update(todo: TodoItem): Observable<TodoItem> {
      const idx = this.todos.findIndex(t => t.id === todo.id);
      if (idx > -1) this.todos[idx] = todo;
      console.log("Updated todo:", todo);
      return of(todo);
    }
}
