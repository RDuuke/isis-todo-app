import { Injectable } from "@angular/core";
import { TodoRepository } from "../../domain/todo/todo.repository";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { TodoItem } from "../../domain/todo/todo-item.model";

@Injectable({
    providedIn: 'root'
})
export class TodoHttpService implements TodoRepository {
    constructor(private http: HttpClient) {}

    create(todoItem: Partial<TodoItem>): Observable<TodoItem> {
        return this.http.post<TodoItem>('/api/todos', todoItem);
    }

    get(): Observable<TodoItem[]> {
        return this.http.get<TodoItem[]>('/api/todos');
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`/api/todos/${id}`);
    }
    
    update(todo: TodoItem): Observable<TodoItem> {
        return this.http.put<TodoItem>(`/api/todos/${todo.id}`, todo);
    }
      
}