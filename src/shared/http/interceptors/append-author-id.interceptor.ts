import { HttpInterceptorFn } from '@angular/common/http';
import {environment} from "../../../environments/environment";

export const appendAuthorIdInterceptor: HttpInterceptorFn = (req, next) => {
  const authorId = environment.authorId

  const authReq = req.clone({
    setHeaders: {
      authorId: `${authorId}`
    }
  })

  return next(authReq);
};
