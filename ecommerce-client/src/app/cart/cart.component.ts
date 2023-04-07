import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
cartItems:any
  constructor( private cartservice:CartService, private route:Router) { }

  ngOnInit(): void {
    this.loaditems()
  }

  loaditems(){
    this.cartservice.loadCart()
    this.cartItems = this.cartservice.getItems()
    console.log(this.cartItems)
  }

  deleteCartItem(item:any){
    this.cartservice.removeItem(item)
    
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: 'product deleted from cart',
      showConfirmButton: false,
      timer: 800
    })
    window.location.reload()
  }



}
