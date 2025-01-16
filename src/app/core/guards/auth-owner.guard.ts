import { CanActivateFn } from '@angular/router';

export const authOwnerGuard: CanActivateFn = (route, state) => {
  //accede al local storage para obtener el valor del usuario actual
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  //Devuelve true si el valor del rol actual es "propietario"
  return (currentUser.role === 'propietario')?true:false;
};
