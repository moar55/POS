import { ProductsService } from './products.service';
import { ManufacturerService } from './manufacturer.service';
import { OrdersService } from './orders.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login.service';
import { HttpClientModule } from '@angular/common/http';
import { StockComponent } from './stock/stock.component';
import { AppRoutingModule } from './app-routing.module';
import { AddOrderComponent } from './add-order/add-order.component';
import { AddItemComponent } from './add-order/add-item/add-item.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpModule } from '@angular/http';
import { AuthGuard } from './auth.guard';
import { LoginGuard } from './login.guard';
import { StockService } from './stock.service';
import { OrdersComponent } from './orders/orders.component';
import { EditStockItemComponent } from './edit-stock-item/edit-stock-item.component';
import { HomePageComponent } from './home-page/home-page.component';
import { OrderDetailsEditComponent } from './order-details-edit/order-details-edit.component';
import { ProductsComponent } from './products/products.component';
import { ManufacturerComponent } from './manufacturer/manufacturer.component';
import { EditProductComponent } from './edit-product/edit-product.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StockComponent,
    AddOrderComponent,
    AddItemComponent,
    NavbarComponent,
    OrdersComponent,
    EditStockItemComponent,
    HomePageComponent,
    OrderDetailsEditComponent,
    ProductsComponent,
    ManufacturerComponent,
    EditProductComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,

  ],
  providers: [
    LoginService,
    StockService,
    AuthGuard,
    LoginGuard,
    OrdersService,
    ManufacturerService,
    ProductsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
