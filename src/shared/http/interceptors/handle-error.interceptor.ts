import { HttpInterceptorFn } from '@angular/common/http';
import {catchError, throwError} from "rxjs";

export const handleErrorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((err) => {
      console.log(err)
      console.error(err)

      return throwError(() => err)
    })
  );
};
