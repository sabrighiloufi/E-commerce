import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductdetailsRoutingModule } from './productdetails-routing.module';
import { ProductdetailsComponent } from './productdetails.component';
import { FormsModule } from '@angular/forms';
import { QuantityproductDirective } from '../directives/quantityproduct.directive';


@NgModule({
  declarations: [
    ProductdetailsComponent,
    QuantityproductDirective,
  ],
  imports: [
    CommonModule,
    ProductdetailsRoutingModule,
    FormsModule
  ]
})
export class ProductdetailsModule { }
