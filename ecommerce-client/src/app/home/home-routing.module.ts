import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from '../cart/cart.component';
import { CheckoutComponent } from '../checkout/checkout.component';
import { LayoutComponent } from '../components/layout/layout.component';
import { FactureComponent } from '../facture/facture.component';
import { ListproductComponent } from '../listproduct/listproduct.component';
import { LoginComponent } from '../login/login.component';
import { ProductdetailsComponent } from '../productdetails/productdetails.component';
import { ProfileComponent } from '../profile/profile.component';
import { RegisterComponent } from '../register/register.component';
import { HomeComponent } from './home.component';

const routes: Routes = [{ path: '', component: HomeComponent, children:[
  {path:'', component: LayoutComponent},
  {path:'list-product', component: ListproductComponent},
  {path:'detailsproduct/:id', component: ProductdetailsComponent},
  {path:'shoppingcart', component: CartComponent},
  {path:'checkout', component: CheckoutComponent},
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent},
  {path:'facture', component: FactureComponent},
  {path:'profile', component: ProfileComponent},
] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
