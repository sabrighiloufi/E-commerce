import { Component, OnInit } from '@angular/core';
import { SubcategoryService } from 'src/app/services/subcategory.service';
import Swal from 'sweetalert2';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-subcategories',
  templateUrl: './list-subcategories.component.html',
  styleUrls: ['./list-subcategories.component.css']
})
export class ListSubcategoriesComponent implements OnInit {
subcategories:any
closeResult = '';
subcategory: FormGroup
p: number = 1
itemPerPage: any = 5
search_name:any
  constructor(private subcategoryservice : SubcategoryService, private modalService: NgbModal, private formbuilder:FormBuilder) { }

  ngOnInit(): void {
    this.getSubcategories()
    this.subcategory = this.formbuilder.group({
      name:['', Validators.required],
      description:['', Validators.required],
      _id:['', Validators.required],
    })
  }
  getSubcategories(){
    this.subcategoryservice.getSubcategories().subscribe((res:any)=>{
      this.subcategories=res["data"]
      console.log(this.subcategories)
    })
  }

  update(){
    this.subcategoryservice.update(this.subcategory.value._id, this.subcategory.value).subscribe((res:any)=>{
      console.log(res["data"])
      this.getSubcategories()
    })
  }

  deleteOne(id:any){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't to delete this product!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.subcategoryservice.deleteSubCategory(id).subscribe((res:any)=>{
          Swal.fire(
            'Deleted!',
            'Your product has been deleted.',
            'success'
          )
          this.getSubcategories()
        })
      }
    })
  }

  open(content:any, subcategory:any) {
    this.subcategory.patchValue({
      name: subcategory.name,
      description: subcategory.description,
      _id: subcategory._id
    })
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
	}

	private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}
}
