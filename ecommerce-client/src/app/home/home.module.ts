import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { FooterComponent } from '../components/footer/footer.component';
import { HeaderComponent } from '../components/header/header.component';
import { LayoutComponent } from '../components/layout/layout.component';
import {NgxPaginationModule} from 'ngx-pagination'; 
import { Ng5SliderModule } from 'ng5-slider';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    LayoutComponent,
    
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgxPaginationModule,
    Ng5SliderModule,
    FormsModule
  ]
})
export class HomeModule { }
