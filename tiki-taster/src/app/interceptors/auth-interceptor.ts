import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthStore } from '../services/auth-store';
import { environment } from '../../environments/environments';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = inject(AuthStore).getAccessToken();

  // Check that this is going to our django backend
  const isApiUrl = req.url.startsWith(environment.apiUrl);

  if (authToken && isApiUrl) {
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return next(clonedReq);
  }

  return next(req);
};
