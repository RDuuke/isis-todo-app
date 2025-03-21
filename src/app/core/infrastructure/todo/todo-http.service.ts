import { Injectable } from "@angular/core";
import { TodoRepository } from "../../domain/todo/todo.repository";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { TodoItem } from "../../domain/todo/todo-item.model";
import { environment } from "../../../../environment/environment";

@Injectable({
    providedIn: 'root'
})
export class TodoHttpService implements TodoRepository {

    private readonly API_URL = environment.apiUrl;

    constructor(private http: HttpClient) {}

    create(todoItem: Partial<TodoItem>): Observable<TodoItem> {
        return this.http.post<TodoItem>(this.API_URL, todoItem);
    }

    get(): Observable<TodoItem[]> {
        return this.http.get<TodoItem[]>(this.API_URL);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${this.API_URL}/${id}`);
    }
    
    update(todo: TodoItem): Observable<TodoItem> {
        return this.http.put<TodoItem>(`${this.API_URL}/${todo.id}`, todo);
    }
      
}