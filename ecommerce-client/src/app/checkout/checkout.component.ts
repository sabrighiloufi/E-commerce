import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
user = JSON.parse(localStorage.getItem("user")!) 
cartitems:any
orderForm:FormGroup
  constructor(private cartservice: CartService, private orderservice: OrderService, private formBuilder:FormBuilder, private route: Router) { }

  ngOnInit(): void {
    console.log(this.user)
    this.loaditems()
    this.orderForm = this.formBuilder.group({
      ref:['', Validators.required],
      priceTotal:['', Validators.required],
      quantityTotal:['', Validators.required],
      description:['', Validators.required],
      client:['', Validators.required],
      products:['', Validators.required],
    })
  }
  loaditems(){
    this.cartservice.loadCart()
    this.cartitems = this.cartservice.getItems()
    console.log(this.cartitems)
  }

  TotalPrice(){
    let total =0
    for(let p of this.cartitems){
      total = total + (p.price * p.quantity)
    }
    return total
  }

  TotalQuantity(){
    let total =0
    for(let p of this.cartitems){
      total += p.quantity
    }
    return total
  }

  createOrder(){
    let Orderproducts : Array<Object> =[] 
    for(let p of this.cartitems){
      let obj ={
        product: p._id,
        quantity: p.quantity,
        price : p.price
      }
      Orderproducts.push(obj)
    }
    
    this.orderForm.patchValue({
      ref: Math.floor(Math.random() * (9999 - 999 + 1) + 999),
      priceTotal: this.TotalPrice(),
      quantityTotal: this.TotalQuantity(),
      description: 'order',
      client: this.user._id,      
      products: Orderproducts
    })
     console.log(this.orderForm.value)
    this.orderservice.createOrder(this.orderForm.value).subscribe((res:any)=>{
      console.log(res["data"])
      this.route.navigateByUrl("/facture")      
    })
  }

}
