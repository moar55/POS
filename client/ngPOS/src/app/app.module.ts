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
import { HomeComponent } from './home/home.component';
import { HttpModule } from '@angular/http';
import { AuthGuard } from './auth.guard';
import { LoginGuard } from './login.guard';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StockComponent,
    AddOrderComponent,
    AddItemComponent,
    NavbarComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    HttpModule
  ],
  providers: [
    LoginService,
    AuthGuard,
    LoginGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
