import { ProductsService } from './../products.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  productsList: [];

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
  deleteProduct(product) {
    this.productSer.deleteProduct(product.id)
      .subscribe(
        res => {
          console.log(res);
          this.productsList.splice(this.productsList.indexOf(product), 1);
        },
        err => {
          console.log(err);
        },
    );
  }

}
