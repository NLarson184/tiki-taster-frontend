import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthStore } from '../services/auth-store';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = inject(AuthStore).getAccessToken();

  if (authToken) {
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return next(clonedReq);
  }

  return next(req);
};
