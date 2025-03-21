import { TestBed } from "@angular/core/testing";
import { DeleteTodoUseCase } from "../../../../app/core/application/todo/delete-todo.usecase";
import { TODO_REPOSITORY_TOKEN } from "../../../../app/core/domain/todo/todo.tokens";
import { TodoMockService } from "../../../../app/core/infrastructure/todo/todo-mock.service";

describe('DeleteTodoUseCase', () => {
    let useCase: DeleteTodoUseCase;
  
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          DeleteTodoUseCase,
          { provide: TODO_REPOSITORY_TOKEN, useClass: TodoMockService }
        ]
      });
      useCase = TestBed.inject(DeleteTodoUseCase);
    });
  
    it('debería eliminar un TODO existente', (done) => {
      const initialTodos = [{ id: 1, text: 'X', completed: false }];
      const mockRepo = TestBed.inject(TODO_REPOSITORY_TOKEN) as TodoMockService;
      mockRepo['todos'] = [...initialTodos];
  
      useCase.execute(1).subscribe({
        next: () => {
          expect(mockRepo['todos'].length).toBe(0);
          done();
        },
        error: done.fail
      });
    });
  });
  