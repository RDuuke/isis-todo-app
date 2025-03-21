import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { TodoItem } from "../../../../core/domain/todo/todo-item.model";

@Component({
    selector: 'app-todo-item',
    templateUrl: './todo-item.component.html',
    standalone: true,
    styleUrls: ['./todo-item.component.scss'],
    imports: [CommonModule]

})
export class TodoItemComponent {
    @Input() todo!: TodoItem;
    @Output() delete = new EventEmitter<TodoItem>();
    @Output() update = new EventEmitter<TodoItem>();

    onDelete(): void {
        this.delete.emit(this.todo);
    }

    onToggle(): void {
        this.update.emit({ ...this.todo, completed: !this.todo.completed });
    }
}