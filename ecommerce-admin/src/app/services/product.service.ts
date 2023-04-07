import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
  token = localStorage.getItem("accessToken")!
  headersoption = new HttpHeaders({
    "authorization": this.token
  })
  getProducts(){
    return this.http.get(`${environment.baseurl}/products/getAll`)
  }
  deleteProduct(id:any){
    return this.http.delete(`${environment.baseurl}/products/delete/${id}`)
  }
  getOneProduct(id:any){
    return this.http.get(`${environment.baseurl}/products/getByID/${id}`)
  }
  addProduct(product :any){
    return this.http.post(`${environment.baseurl}/products/create`, product, {headers: this.headersoption})
  }
  updateProduct(id:any, product:any){
    return this.http.put(`${environment.baseurl}/products/update/${id}`, product)
  }
}

