import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { SubcategoryService } from 'src/app/services/subcategory.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-subcategory',
  templateUrl: './add-subcategory.component.html',
  styleUrls: ['./add-subcategory.component.css']
})
export class AddSubcategoryComponent implements OnInit {
subcategory: FormGroup
categories:any
  constructor(private subcategoryservice:SubcategoryService, private formBuilder: FormBuilder, private route:Router, private categoryservice: CategoryService) { }

  ngOnInit(): void {
    this.getCategories()
    this.subcategory = this.formBuilder.group({
      name:['', Validators.required],
      description:['', Validators.required],
      category: ['', Validators.required]
    })
  }
  getCategories(){
    this.categoryservice.getCategories().subscribe((res:any)=>{
      this.categories= res["data"]
      console.log(this.categories)
    })
  }

  addSubcategory(){
    this.subcategoryservice.addSubCategory(this.subcategory.value).subscribe((res:any)=>{
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'sub-category added successfully',
        showConfirmButton: false,
        timer: 1500
      })
      this.route.navigateByUrl("/home/subcategories")
    })
  }

}
