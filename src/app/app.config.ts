import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { TODO_REPOSITORY_TOKEN } from './core/domain/todo/todo.tokens';
import { TodoMockService } from './core/infrastructure/todo/todo-mock.service';
import { TodoHttpService } from './core/infrastructure/todo/todo-http.service';
import { environment } from '../environment/environment';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    { provide: TODO_REPOSITORY_TOKEN, useClass: environment.useMock ? TodoMockService : TodoHttpService }
  ]
};
