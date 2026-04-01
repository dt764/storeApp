import {CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Si la ruta es pública, no hace falta autenticación
  if (route.data?.['public']) {
    return true;
  }

  // Solo deja pasar si el usuario está autenticado
  if (authService.currentUser()) {
    return true;
  } else {
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
};

export const redirectIfLoggedInGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.currentUser()) {
    router.navigate(['/products']);
    return false; // evita que accedan al login
  }

  return true; // no está autenticado → puede ver login o register
};