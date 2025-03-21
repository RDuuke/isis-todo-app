import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { UpdateTodoUseCase } from '../../../../app/core/application/todo/update-todo.usecase';
import { TodoMockService } from '../../../../app/core/infrastructure/todo/todo-mock.service';
import { TODO_REPOSITORY_TOKEN } from '../../../../app/core/domain/todo/todo.tokens';
import { TodoItem } from '../../../../app/core/domain/todo/todo-item.model';

describe('UpdateTodoUseCase', () => {
  let useCase: UpdateTodoUseCase;
  let mockRepo: TodoMockService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UpdateTodoUseCase,
        { provide: TODO_REPOSITORY_TOKEN, useClass: TodoMockService }
      ]
    });
    useCase = TestBed.inject(UpdateTodoUseCase);
    mockRepo = TestBed.inject(TODO_REPOSITORY_TOKEN) as TodoMockService;
    mockRepo['todos'] = [{ id: 1, text: 'Test', completed: false }];
  });

  it('should toggle completed flag', (done) => {
    const todo: TodoItem = { id: 1, text: 'Test', completed: true };
    useCase.execute(todo).subscribe(updated => {
      expect(updated.completed).toBeTrue();
      expect(mockRepo['todos'][0].completed).toBeTrue();
      done();
    });
  });
});
