import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
id = this.activatedroute.snapshot.params["id"]
product:any
  constructor( private productservice: ProductService, private activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.id)
    this.getOneProduct()
  }
  getOneProduct(){
    this.productservice.getOneProduct(this.id).subscribe((res:any)=>{
      this.product= res["data"]
      console.log(this.product)
    })
  }

}
