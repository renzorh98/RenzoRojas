import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {appendAuthorIdInterceptor} from "../shared/http/interceptors/append-author-id.interceptor";
import {handleErrorInterceptor} from "../shared/http/interceptors/handle-error.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(withInterceptors([appendAuthorIdInterceptor, handleErrorInterceptor]))]
};
