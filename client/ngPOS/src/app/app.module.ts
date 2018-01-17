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


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StockComponent,
    AddOrderComponent,
    AddItemComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,

  ],
  providers: [
    LoginService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
