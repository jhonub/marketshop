import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class WebService {
  private API_Server = "https://codbar-api.herokuapp.com/api/";
  constructor(
    private http:HttpClient
  ) { }

  
  getListProductos():Observable<any>{
    return this.http.get(this.API_Server + 'productos/');
  }
  getIdProducto(id):Observable<any>{
    return this.http.get(this.API_Server + 'productos/' + id);
  }
  postProductos(producto):Observable<any>{
    return this.http.post(this.API_Server + 'productos/', producto);
  }
  putProductos(id, producto):Observable<any>{
    return this.http.put(this.API_Server + 'productos/' + id, producto);
  }
  deleteProducto(id):Observable<any>{
    return this.http.delete(this.API_Server + 'productos/' + id);
  }
}