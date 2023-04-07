import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appQuantityproduct]'
})
export class QuantityproductDirective {
@Input('qty') qty:any
@Input('qtyuser') qtyuser:any
  constructor( private render: Renderer2, private elmt: ElementRef) { }
  @HostListener("keyup")
  setClick(){
    if( this.qtyuser >0 && this.qtyuser <= this.qty){
      this.render.setStyle(this.elmt.nativeElement, "backgroundColor", "green")
    }else{
      this.render.setStyle(this.elmt.nativeElement, "backgroundColor", "red")
    }
  }
}
