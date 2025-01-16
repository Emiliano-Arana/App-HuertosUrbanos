import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  //url del back para el manejo del producto
  private api: string = 'http://localhost:8080/api/productos'


  constructor(private http: HttpClient) { }

  //Funcion get para obtener la lista de productos
  getProducts():Observable<Product []>{
    return this.http.get<Product[]>(this.api);
  }
}
