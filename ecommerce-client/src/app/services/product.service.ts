import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
  // token = localStorage.getItem("accessToken")!
  // headersoption = new HttpHeaders({
  //   "authorization": this.token
  // })
  
  getproducts(){
    return this.http.get(`${environment.baseurl}/products/getAll`)
  }

  getOne(id:any){
    return this.http.get(`${environment.baseurl}/products/getByID/${id}`)
  }
}
