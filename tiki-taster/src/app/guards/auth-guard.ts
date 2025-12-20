import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { inject } from '@angular/core';
import { AuthStore } from '../services/auth-store';

export const authGuard: CanActivateFn = (route, state) => {
  const authStore = inject(AuthStore);
  const router = inject(Router);

  // Allow the user to visit if authenticated
  if (authStore.isAuthenticated()) {
    return true;
  }

  // Default to the home page if not authenticated.
  return router.createUrlTree(['']);
};
