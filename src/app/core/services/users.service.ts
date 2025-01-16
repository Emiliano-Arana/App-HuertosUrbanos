import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  //url del Back para el controlador del usuario
  private api: string = 'http://localhost:8080/api/usuarios';

  constructor(private http: HttpClient) {  }
  
  //funcion post para registrar usuario
  registerUser(user : User):Observable<User>{
    return this.http.post<User>(this.api,user);
  }

  //funcion put para actualizar el usuario
  updateUser(id: number, user: User): Observable<any> {
    return this.http.put(`${this.api}/${id}`, user);
  }

  //obtener los datos del usuario por id
  getById(id:number): Observable<User>{
    return this.http.get<User>(`${this.api}/${id}`);
  }
}
