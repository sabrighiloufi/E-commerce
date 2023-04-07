import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
loginForm: FormGroup
submitted = false;
  constructor(private loginservice: LoginService, private formBuilder:FormBuilder, private route: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:['', [Validators.required ,  Validators.email]],
      password:['', Validators.required],
    })
  }

  login(){
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }
    this.loginservice.login(this.loginForm.value).subscribe((res:any)=>{
      console.log(res["data"])
      localStorage.setItem('user', JSON.stringify(res.data))
      localStorage.setItem('accessToken', res.accessToken)
      localStorage.setItem('refreshToken', res.refreshToken)
      localStorage.setItem('state', '0')
      this.route.navigateByUrl('/home')
      
        
      
    },
      err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops... user not found',
          text: 'email invalid!',
          footer: 'password invalid'
        })
        console.log(err)
      }
    )
  }

  get f() {
    return this.loginForm.controls;
  }

}
