import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
items = [] as any
  constructor() { }

  saveCart():void{
    localStorage.setItem('cart items', JSON.stringify(this.items))
  }

  addToCart(addedCart:any){
    this.items.push(addedCart)
    this.saveCart()
  }

  itemInCart(item:any): boolean {
    return this.items.findIndex((o:any)=> o._id === item._id) > -1;
  }

  loadCart() : void {
    this.items = JSON.parse(localStorage.getItem('cart items')!) ?? []
  }

  getItems(){
    return this.items
  }

  removeItem(item:any) {
    const index = this.items.findIndex((o:any)=> o._id === item._id)
    if(index > -1){
      this.items.splice(index, 1)
      this.saveCart()
    }    
  }

}
