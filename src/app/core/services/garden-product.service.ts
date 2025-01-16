import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GardenProduct } from '../models/gardenProduct.model';
import { Observable } from 'rxjs';
import { Relation } from '../models/relation.model';

@Injectable({
  providedIn: 'root'
})
export class GardenProductService {
  //url del controlador de huerto producto del back
  private api: string = 'http://localhost:8080/api/huerto-productos';
  constructor(private http:HttpClient) { }

  //funcion post para relacinoar un huerto y un producto
  createRelation(relation:Relation):Observable<Relation>{
    return this.http.post<Relation>(this.api,relation);
  }

  //funcion para borrar la relacion entre un huerto y un producto
  deleteRelation(id:number):Observable<any>{
    return this.http.delete(`${this.api}/${id}`);
  }

  //funcion para actualizar relacion, se usa para cambiar el inventario
  updateRelation(id:number,relation:Relation):Observable<any>{
    return this.http.put(`${this.api}/${id}`,relation);
  }
}
