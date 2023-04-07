import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
user = JSON.parse(localStorage.getItem("user")!) 
  constructor() { }

  ngOnInit(): void {
    console.log(this.user)
  }

}
