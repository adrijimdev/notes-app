import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router); //inyecto el servicio Router para poder redirigir a un componente en caso necesario

  const userId = localStorage.getItem('userId');

  //verifico que userId almacenado en localStorage tenga un valor que no sea vacío, en cuyo caso permito el acceso
  if (userId !== '') {
    return true;
  }

  //si no hay sesión iniciada, redirigo al componente deseado
  router.navigate(['/login-or-register']);
  return false;
};
