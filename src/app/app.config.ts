import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { TODO_REPOSITORY_TOKEN } from './core/domain/todo/todo.tokens';
import { TodoMockService } from './core/infrastructure/todo/todo-mock.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    { provide: TODO_REPOSITORY_TOKEN, useClass: TodoMockService }

  ]
};
