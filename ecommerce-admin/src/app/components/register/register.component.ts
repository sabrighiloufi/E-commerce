import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
registerForm: FormGroup
picture: Array<File> = []
  constructor(private loginservice: LoginService, private formBuilder: FormBuilder, private route: Router) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName:['', Validators.required],
      lastName:['', Validators.required],  
      email:['', Validators.required],  
      password:['', Validators.required],  
      confirmPassword:['', Validators.required]
    })
  }

  register(){
    let formData = new FormData()
    formData.append("firstName", this.registerForm.value.firstName)
    formData.append("lastName", this.registerForm.value.lastName)
    formData.append("email", this.registerForm.value.email)
    formData.append("password", this.registerForm.value.password)
      
    formData.append("photo", this.picture[0])
  
    console.log(formData)
    this.loginservice.register(formData).subscribe((res:any)=>{
      console.log(res["data"])
      this.route.navigateByUrl("/")
    })
  }

  handleFileInput(file:any){
    this.picture = <Array<File>> file.target.files

  }

}
