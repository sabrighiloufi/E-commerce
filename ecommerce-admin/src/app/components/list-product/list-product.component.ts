import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {
products: any
closeResult = ''
product: FormGroup
p: number = 1
search_name:any
itemPerPage:any = 5
  constructor(private productservice: ProductService, private modalService: NgbModal, private formbuilder: FormBuilder) { }

  ngOnInit(): void {
    this.product = this.formbuilder.group({
      refproduct:['', Validators.required],
      price:['', Validators.required],
      quantity:['', Validators.required],
      description:['', Validators.required],
      _id:['', Validators.required],
    })
    this.getProducts()
  }
  getProducts(){
    this.productservice.getProducts().subscribe((res:any)=>{
      this.products = res["data"]
      console.log("list of products", this.products)
    })
  }
  updateProduct(){
    this.productservice.updateProduct(this.product.value._id, this.product.value).subscribe((res:any)=>{
      console.log(res["data"])
      this.getProducts()
    })
  }
  deleteProduct(id:any){
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
        this.productservice.deleteProduct(id).subscribe((res:any)=>{
          Swal.fire(
            'Deleted!',
            'Your product has been deleted.',
            'success'
          )
          this.getProducts()
        })
        
      }
    })
   
  }
  open(content:any, product:any) {
    this.product.patchValue({
      refproduct:product.refproduct,
      price: product.price,
      quantity: product.quantity,
      description: product.description,
      _id: product._id 
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
