import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { ProductService } from '../services/product.service';
import { Options, LabelType } from 'ng5-slider';
import { elementAt } from 'rxjs';

@Component({
  selector: 'app-listproduct',
  templateUrl: './listproduct.component.html',
  styleUrls: ['./listproduct.component.css']
})
export class ListproductComponent implements OnInit {
products:any
p: number = 1
categories:any
priceSelection = ''
minValue: number = 2
maxValue: number = 10000
options: Options = {
  floor:0,
  ceil:10000
}
  constructor(private productservice:ProductService, private categoryservice:CategoryService) { }

  ngOnInit(): void {
    
    this.getProducts()
    this.getCategories()
  }
  
  getProducts(){
    this.productservice.getproducts().subscribe((res:any)=>{
      this.products = res["data"]
      console.log(this.products)
    })
    
  }

  getCategories(){
    this.categoryservice.getCategories().subscribe((res:any)=>{
      this.categories = res["data"]
      console.log(this.categories)
    })
  }

  getProductByCategory(e:any){
    this.productservice.getproducts().subscribe((res:any)=>{
      this.products = res["data"].filter((el:any)=>el.subcategory.category._id == e.target.value)
      console.log(this.products)
    }
    )
  }

  changePrice(){
    let event = this.priceSelection
    this.productservice.getproducts().subscribe((res:any)=>{
      this.products = res["data"]
      if(event !== undefined){
        const listproductByPrice = this.products.filter((p:any)=>p.price >= event[0] && p.price <= event[1])
        this.products = listproductByPrice
        console.log('filter by price', this.products)
      }
    })
  }

  getByColor(e:any){
    this.productservice.getproducts().subscribe((res:any)=>{
      this.products = res["data"].filter((element:any)=> element.color == e.target.value)
    })
  }

}
