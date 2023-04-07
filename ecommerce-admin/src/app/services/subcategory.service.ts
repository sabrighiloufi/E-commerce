import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {

  constructor(private http: HttpClient) { }
  getSubcategories(){
    return this.http.get(`${environment.baseurl}/subcategories/getAll`)
  }
  addSubCategory(SubCategory:any){
    return this.http.post(`${environment.baseurl}/subcategories/create`, SubCategory)
  }
  deleteSubCategory(id:any){
    return this.http.delete(`${environment.baseurl}/subcategories/delete/${id}`)
  }
  update(id:any, subcategory:any){
    return this.http.put(`${environment.baseurl}/subcategories/update/${id}`, subcategory)
  }
}
