import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { StockComponent } from './stock/stock.component';
import { AddOrderComponent } from './add-order/add-order.component';


const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: '' , redirectTo: '/login' , pathMatch: 'full'
  },
  {
    path: 'stock', component: StockComponent
  },
  {
  path: 'add-order', component : AddOrderComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule { }
