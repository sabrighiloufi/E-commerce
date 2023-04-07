import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListproductRoutingModule } from './listproduct-routing.module';
import { ListproductComponent } from './listproduct.component';
import {NgxPaginationModule} from 'ngx-pagination'; 
import { Ng5SliderModule } from 'ng5-slider';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ListproductComponent
  ],
  imports: [
    CommonModule,
    ListproductRoutingModule,
    NgxPaginationModule,
    Ng5SliderModule,
    FormsModule
  ]
})
export class ListproductModule { }
