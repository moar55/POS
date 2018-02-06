import { EditProductComponent } from './edit-product/edit-product.component';
import { ManufacturerComponent } from './manufacturer/manufacturer.component';
import { ProductsComponent } from './products/products.component';
import { OrderDetailsEditComponent } from './order-details-edit/order-details-edit.component';
import { HomePageComponent } from './home-page/home-page.component';
import { EditStockItemComponent } from './edit-stock-item/edit-stock-item.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { StockComponent } from './stock/stock.component';
import { AddOrderComponent } from './add-order/add-order.component';
import { AuthGuard } from './auth.guard';
import { LoginGuard } from './login.guard';
import { OrdersComponent } from './orders/orders.component';


const routes: Routes = [
  {
    path: 'login', component: LoginComponent, canActivate: [LoginGuard]
  },
  {
    path: 'home', component: HomePageComponent, canActivate: [AuthGuard]
  },
  {
    path: '', redirectTo: '/home', pathMatch: 'full'
  },
  {
    path: 'stock', component: StockComponent, canActivate: [AuthGuard]
  },
  {
    path: 'add-order', component: AddOrderComponent, canActivate: [AuthGuard]
  },
  {
    path: 'orders', component: OrdersComponent,
  },
  {
    path: 'stock/:R', component: EditStockItemComponent,
  },
  {
    path: 'orders/:id', component: OrderDetailsEditComponent,
  },
  {
    path: 'products', component: ProductsComponent,
  },
  {
    path: 'manufacturers', component: ManufacturerComponent,
  },
  {
    path: 'products/:id', component: EditProductComponent,
  },
];

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
