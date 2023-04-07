import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  login(loginRequest:any){
    return this.http.post(`${environment.baseurl}/auth/login`, loginRequest)
  }
  
  register(registerRequest:any){
    return this.http.post(`${environment.baseurl}/clients/create`, registerRequest)
  }

  getJwtToken(){
    //console.log(localStorage.getItem('accessToken')!)
    return localStorage.getItem('accessToken')!
    
  }
    
    
    
refreshToken(){
  //console.log(localStorage.getItem('refreshToken')!)
  let user = JSON.parse(localStorage.getItem('user')!)
  let params = {
  _id:user._id,
   RefreshToken : localStorage.getItem("refreshToken")};
  return this.http.post(`${environment.baseurl}/auth/refreshToken`, params)

}
    

}
