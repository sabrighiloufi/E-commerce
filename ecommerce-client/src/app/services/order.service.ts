import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor( private http: HttpClient) { }
  //without iterceptor
  // token = localStorage.getItem("accessToken")!
  // headersoption = new HttpHeaders({
  //   "authorization": this.token
  // })

  createOrder(orderForm:any){
    return this.http.post(`${environment.baseurl}/orders/create`, orderForm/*,  {headers: this.headersoption}*/)
  }
}
