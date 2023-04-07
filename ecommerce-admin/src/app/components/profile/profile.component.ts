import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
admin = JSON.parse(localStorage.getItem("user")!)
picture = this.admin.image
  constructor() { }

  ngOnInit(): void {
    console.log(this.admin)
  }

}
