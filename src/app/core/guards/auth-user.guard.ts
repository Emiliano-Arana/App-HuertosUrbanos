import { CanActivateFn } from '@angular/router';

export const authUserGuard: CanActivateFn = (route, state) => {
  //accede al local storage para obtener el valor del usuario actual
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  //devuelve true si el rol actual es "usuario"
  return (currentUser.role === 'usuario')?true:false;
};
