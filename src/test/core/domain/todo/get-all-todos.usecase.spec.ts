import { TestBed } from '@angular/core/testing';
import { GetAllTodosUseCase } from '../../../../app/core/application/todo/get-all-todos.usecase';
import { TodoMockService } from '../../../../app/core/infrastructure/todo/todo-mock.service';
import { TODO_REPOSITORY_TOKEN } from '../../../../app/core/domain/todo/todo.tokens';
import { TodoItem } from '../../../../app/core/domain/todo/todo-item.model';
import { of } from 'rxjs';

describe('GetAllTodosUseCase (mock)', () => {
  let useCase: GetAllTodosUseCase;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GetAllTodosUseCase,
        { 
            provide: TODO_REPOSITORY_TOKEN, useClass: TodoMockService,
            useValue: {
                get: () => of([
                  { id: 1, text: 'Tarea de prueba', completed: false } as TodoItem
                ])
              }
        }
      ]
    });
    useCase = TestBed.inject(GetAllTodosUseCase);
  });

  it('debería devolver la lista inicial de TODOs', (done) => {
    useCase.execute().subscribe({
      next: todos => {
        expect(Array.isArray(todos)).toBeTrue();
        expect(todos.length).toBe(1);
        expect(todos[0].id).toBe(1);
        expect(todos[0].text).toBe('Tarea de prueba');
        done();
      },
      error: done.fail
    });
  });
});
