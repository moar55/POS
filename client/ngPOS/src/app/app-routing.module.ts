import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { StockComponent } from './stock/stock.component';
import { AddOrderComponent } from './add-order/add-order.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';
import { LoginGuard } from './login.guard';


const routes: Routes = [
  {
    path: 'login', component: LoginComponent, canActivate: [LoginGuard]
  },
  {
    path: '' , component: HomeComponent , canActivate: [AuthGuard]
  },
  {
    path: 'stock', component: StockComponent,canActivate: [AuthGuard]
  },
  {
  path: 'add-order', component : AddOrderComponent, canActivate: [AuthGuard]

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
