import { NgModule } from '@angular/core';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptorInterceptor } from './interceptors/auth-interceptor.interceptor';
import { QuantityproductDirective } from './directives/quantityproduct.directive';


@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
      
  ],
  providers: [
    
      {provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptorInterceptor,
        multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
