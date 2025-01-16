import { Garden } from './../models/garden.model';
import { GardenC } from './../models/gardenC.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GardensService {
  //url del back para el controlador de los huertos
  private api: string = 'http://localhost:8080/api/huertos';

  constructor(private http: HttpClient) {  }
  
  //funcion get para obtener todos los huertos
  getAllGardensList():Observable<Garden []>{
    return this.http.get<Garden[]>(this.api);
  }

  //funcion get para obtener los datos de un huerto por su ID
  getGardenById(id: number):Observable<Garden>{
    return this.http.get<Garden>(`${this.api}/${id}`);
  }

  //funcion get para obtener los huertos de un usuario en especifico
  getGardenByUserId(id: number):Observable<Garden []>{
    return this.http.get<Garden[]>(`${this.api}/user/${id}`);
  }

  //funcion delete para borrar un huerto en base a su id
  deleteGarden(idGarden: number):Observable<any> {
    return this.http.delete(`${this.api}/${idGarden}`);
  }

  //funcion para crear un huerto (post)
  createGarden(garden:GardenC):Observable<GardenC>{
    return this.http.post<GardenC>(this.api,garden);
  }

  //funcion put para actualizar los datos de un huerto
  updateGarden(id:number,garden:GardenC):Observable<any>{
    return this.http.put(`${this.api}/${id}`,garden);
  }
}
