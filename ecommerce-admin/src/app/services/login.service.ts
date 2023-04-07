import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(requestLogin:any){
   return this.http.post(`${environment.baseurl}/auth/login`, requestLogin)
  }
  register(requesrRegister:any){
    return this.http.post(`${environment.baseurl}/admins/create`, requesrRegister)

  }
}
