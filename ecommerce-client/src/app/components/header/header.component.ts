import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
cartItems: any

  constructor( private cartservice:CartService, private route:Router) { }

  ngOnInit(): void {
    this.loaditems()
    this.TotalPrice()
  }

  loaditems(){
    this.cartservice.loadCart()
    this.cartItems = this.cartservice.getItems()
    console.log(this.cartItems)
  }

  TotalPrice(){
    let total =0
    for(let p of this.cartItems){
      total = total + (p.price * p.quantity)
    }
    return total
  }

  deleteCartItem(item:any){
    this.cartservice.removeItem(item)
    this.ngOnInit()
  }

  verify(){
    if(localStorage.getItem("state")=='0'){
      this.route.navigateByUrl("/checkout")
    }else{
      this.route.navigateByUrl("/login")
    }
  }
  logout(){
    localStorage.clear()
    this.route.navigateByUrl("/")
  }
  
  isLoggedIn(): boolean{
    if(localStorage.getItem("state")=='0'){
      return true
    }else{
      return false
    }
  }

}
