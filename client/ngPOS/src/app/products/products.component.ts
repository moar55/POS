import { ProductsService } from './../products.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  productsList: any;

  constructor(
    private productSer: ProductsService
  ) { }

  ngOnInit() {
    this.getProductsList();
  }
  getProductsList() {
    this.productSer.getProductsList()
      .subscribe(
      res => {
        console.log('res is', res);
        this.productsList = res['data'];
        console.log('product list ', this.productsList);
      },
      err => console.log(err)


      );
  }

}
