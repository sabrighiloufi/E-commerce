import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent implements OnInit {
id= this.activatedroute.snapshot.params["id"]
product:any
items:any
numberProduct:any =1
  constructor(private activatedroute: ActivatedRoute, private productservice:ProductService, private cartservice:CartService) { }

  ngOnInit(): void {
    console.log(this.id)
    this.getOne()
  }
  getOne(){
    this.productservice.getOne(this.id).subscribe((res:any)=>{
      this.product = res["data"]
      console.log(this.product)
    })
  }
  incrementer(){
    if(this.numberProduct < this.product.quantity){
      this.numberProduct ++
    }
  }
  decrementer(){
    if(this.numberProduct > 0){
      this.numberProduct --
    }
  } 
  
  async addToCart(item:any){
    if(!this.cartservice.itemInCart(this.product)){
      item.quantity = this.numberProduct
      this.cartservice.addToCart(item)
      
      await Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'product added successfully',
        showConfirmButton: false,
        timer: 800
      })
      window.location.reload()
    }
  }
}
