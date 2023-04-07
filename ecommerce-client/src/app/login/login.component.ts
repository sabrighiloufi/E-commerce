import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  constructor(private authservice: AuthenticationService, private formbuilder:FormBuilder, private route: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      email:['', [Validators.required ,  Validators.email]],
      password:['', Validators.required],
    })
  }
  login(){
    this.authservice.login(this.loginForm.value).subscribe((res:any)=>{
      console.log(res["data"])
      localStorage.setItem('user', JSON.stringify(res.data))
      localStorage.setItem('accessToken', res.accessToken)
      localStorage.setItem('refreshToken', res.refreshToken)
      localStorage.setItem('state', '0')
      this.route.navigateByUrl('/checkout')
      window.location.reload()
    })
  }
  

}
