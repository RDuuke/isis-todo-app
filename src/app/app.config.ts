import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { TODO_REPOSITORY_TOKEN } from './core/domain/todo/todo.tokens';
import { TodoMockService } from './core/infrastructure/todo/todo-mock.service';
import { TodoHttpService } from './core/infrastructure/todo/todo-http.service';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { apiKeyInterceptor } from './core/infrastructure/interceptors/api-key.interceptor';
import { environment } from '../environments/environment';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    provideRouter(routes),
    provideHttpClient(), 
    provideHttpClient(withInterceptors([apiKeyInterceptor])),
    { provide: TODO_REPOSITORY_TOKEN, useClass: environment.useMock ? TodoMockService : TodoHttpService },
  ]
};
