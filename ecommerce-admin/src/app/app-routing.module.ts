import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './components/add-product/add-product.component';
import { AddSubcategoryComponent } from './components/add-subcategory/add-subcategory.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { ListProductComponent } from './components/list-product/list-product.component';
import { ListSubcategoriesComponent } from './components/list-subcategories/list-subcategories.component';
import { LoginComponent } from './components/login/login.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path:'home', canActivate:[AuthGuard] ,component: HomeComponent, children:[
    {path: '', component: LayoutComponent},
    {path: 'add-product', component: AddProductComponent},
    {path: 'list-product', component: ListProductComponent},
    {path: 'product-details/:id', component: ProductDetailsComponent},
    {path: 'subcategories', component: ListSubcategoriesComponent},
    {path: 'add-subcategory', component: AddSubcategoryComponent},
    {path: 'my-profile', component: ProfileComponent},
  ]},
  {path:'', component: LoginComponent},
  {path:'register', component: RegisterComponent},
  {path:'forgot-password', component: ForgotPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
