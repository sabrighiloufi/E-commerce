import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { SubcategoryService } from 'src/app/services/subcategory.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
product:FormGroup
subcategories:any
myFiles: string [] = []
  constructor(private productservice: ProductService, private formBuilder: FormBuilder, private route: Router, private subcategoryservice: SubcategoryService) { }

  ngOnInit(): void {
    this.product = this.formBuilder.group({
      refproduct: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
      description: ['', Validators.required],
      subcategory: ['', Validators.required],
    })
    this.getSubcategories()
  }
  addProduct(){

    let formData = new FormData()
    formData.append("refproduct", this.product.value.refproduct)
    formData.append("price", this.product.value.price)
    formData.append("quantity", this.product.value.quantity)
    formData.append("description", this.product.value.description)
    formData.append("subcategory", this.product.value.subcategory)

    for( var i=0; i < this.myFiles.length; i++){
      formData.append("photos", this.myFiles[i])
    }

    this.productservice.addProduct(formData).subscribe((res:any)=>{
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'product added successfully',
        showConfirmButton: false,
        timer: 1500
      })
    this.route.navigateByUrl("/home/list-product")
    })
  }
  getSubcategories(){
    this.subcategoryservice.getSubcategories().subscribe((res:any)=>{
      this.subcategories= res["data"]
      console.log(this.subcategories)
    })
  }

  onFileChange(event: any){
    for( var i=0; i < event.target.files.length; i++){
      this.myFiles.push( event.target.files[i])
    }
  }
}
