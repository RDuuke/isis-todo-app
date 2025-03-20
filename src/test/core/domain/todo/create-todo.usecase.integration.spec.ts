import { TestBed } from '@angular/core/testing';
import { CreateTodoUseCase } from '../../../../app/core/application/todo/create-todo.usecase';
import { TODO_REPOSITORY_TOKEN } from '../../../../app/core/domain/todo/todo.tokens';
import { TodoMockService } from '../../../../app/core/infrastructure/todo/todo-mock.service';
import { TodoItem } from '../../../../app/core/domain/todo/todo-item.model';

describe('CreateTodoUseCase using Mock Service', () => {
  let useCase: CreateTodoUseCase;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CreateTodoUseCase,
        { provide: TODO_REPOSITORY_TOKEN, useClass: TodoMockService }
      ]
    });
    useCase = TestBed.inject(CreateTodoUseCase);
  });

  it('debería crear un nuevo TODO con el texto "Test Todo"', (done: DoneFn) => {
    useCase.execute('Test Todo').subscribe({
      next: (todo: TodoItem) => {
        expect(todo).toBeDefined();
        expect(todo.text).toEqual('Test Todo');
        expect(todo.completed).toBeFalse();
        done();
      },
      error: done.fail
    });
  });

  it('debería arrojar error si el texto es vacío', () => {
    expect(() => useCase.execute('')).toThrowError('Text cannot be empty');
  });
});
