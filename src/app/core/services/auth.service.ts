import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { userCredential } from '../models/userCredential.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //url del controlador de usuario del backend
  private apiUrl = 'http://localhost:8080/api/usuarios';
  private currentUserSubject: BehaviorSubject<userCredential | null>;
  public currentUser: Observable<userCredential | null>;

  //constructor de la clase con el 
  constructor(private http: HttpClient, private router: Router) {
    //obtiene los valores del usuario actual
    const userData = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<userCredential | null>(
      userData ? JSON.parse(userData) : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  //funcion para iniciar sesion
  login(email: string, password: string): Observable<userCredential> {
    //Asigna como parametros el correo y la contraseña
    const params = new HttpParams()
      .set('email', email)
      .set('password', password);
    
    //Manda una peticion al back para iniciar sesion
    return this.http.post<userCredential>(`${this.apiUrl}/login`, null, { params }).pipe(
      map((response: userCredential) => {
        // Guardar los datos del usuario en localStorage
        localStorage.setItem('currentUser', JSON.stringify(response));
        this.currentUserSubject.next(response);
        return response;
      })
    );
  }

  //funcion para cerrar sesion de la aplicacion
  logout(): void {
    //borra los datos del usuario del local storage
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']); // Redirigir al login
  }

  get currentUserValue(): userCredential | null {
    return this.currentUserSubject.value;
  }

  //verifica que haya un usuario con sesion iniciada en la aplicacion
  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }

  //verifica que el usuario con sesion iniciada tenga rol
  hasRole(role: string): boolean {
    return this.currentUserValue?.role === role;
  }
}
