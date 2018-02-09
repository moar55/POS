import { OrdersService } from './../orders.service';
import { ProductsService } from './../products.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  productR: any;
  product: any;
  manufacturers: any;
  updatedProduct = {
    update: {
      manufacturer_id: null,
      price: null,
      R: null,
    }
  };

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private productServ: ProductsService,
    private orderServ: OrdersService
  ) {

  }

  ngOnInit() {
    this.productR = this.route.snapshot.paramMap.get('R');
    console.log(this.productR);
    this.getManfList();
    this.fetchProduct();
  }
  fetchProduct() {
    this.productServ.fetchProduct(this.productR)
      .subscribe(
        (res: Response) => {
          console.log(res);
          this.product = res['data'];
          let shit = res['data'];
          this.updatedProduct.update.manufacturer_id = shit.manufacturer_id;
          this.updatedProduct.update.price = shit.price;
          this.updatedProduct.update.R = shit.R;

        },
        err => console.log(err),
    );
  }
  getManfList() {
    this.orderServ.getManfs()
      .subscribe(
        res => {
          this.manufacturers = res['data'];
          // this.manufacturer.name = res['name'];
          // this.manufacturer.id = res['id'];
          console.log(`manf list from getManfList is ${this.manufacturers}`);
          // ^ da bydy [object Object],[object Object],[object Object],[object Object]
        },
        err => console.log(err)
      );
  }
  editProduct() {
    this.productServ.editProduct(this.productR, this.updatedProduct)
      .subscribe(
        res => {
          console.log(res);
          this.location.back();

        },
        err => {
          console.log(err);
          alert(err);
        },
    );
  }

}
