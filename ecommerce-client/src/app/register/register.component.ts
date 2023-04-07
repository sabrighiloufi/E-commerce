import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
registerForm:FormGroup
  constructor(private authservice: AuthenticationService, private formBuilder:FormBuilder, private route:Router) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName:['', Validators.required],
      lastName:['', Validators.required],
      address_L:['', Validators.required],
      email:['', [Validators.required ,  Validators.email]],
      password:['', Validators.required],
      confirmPassword:['', Validators.required],
    })
  }

  register(){
    this.authservice.register(this.registerForm.value).subscribe((res:any)=>{
      console.log(res["data"])
      this.route.navigateByUrl("/login")
    })
  }

}
