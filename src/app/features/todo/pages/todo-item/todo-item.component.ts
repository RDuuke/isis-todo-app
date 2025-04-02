import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { TodoItem } from "../../../../core/domain/todo/todo-item.model";
import { trigger, transition, style, animate } from "@angular/animations";


@Component({
    selector: 'app-todo-item',
    templateUrl: './todo-item.component.html',
    standalone: true,
    styleUrls: ['./todo-item.component.scss'],
    imports: [CommonModule],
    animations: [
        trigger('fadeInOut', [
            transition(':enter', [style({ opacity: 0 }), animate('300ms ease-out')]),
            transition(':leave', [animate('300ms ease-out', style({ opacity: 0 }))])
        ])
    ]

})
export class TodoItemComponent {
    @Input() todo!: TodoItem;
    @Output() delete = new EventEmitter<TodoItem>();
    @Output() update = new EventEmitter<TodoItem>();

    onDelete(): void {
        const confirmation = confirm('Are you sure you want to delete this todo?');

        if (!confirmation) {
            return;
        }
        this.delete.emit(this.todo);
    }

    onUpdate(): void {
        this.update.emit({ ...this.todo, completed: !this.todo.completed });
    }

    onImportant(): void {
        this.update.emit({ ...this.todo, important: !this.todo.important });
    }
}