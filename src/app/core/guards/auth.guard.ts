import { inject } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  //importa el servicio de autenticacion y el de router
  const as = inject(AuthService);
  const router = inject(Router);
  //obtiene el valor que le devuelve la funcion de "isLoggedIn" del servicio
  if(as.isLoggedIn()){
    //si es verdadera devuelve true
    return true;
  }else {
    //si es falsa, lo envia al login para que inicie sesion y obtenga un rol
    router.navigateByUrl('/login');
    //devuelve falso
    return false;
  }
};
