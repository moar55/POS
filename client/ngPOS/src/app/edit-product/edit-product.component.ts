import { ProductsService } from './../products.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  productID: any;
  products: any;

  constructor(
    private route: ActivatedRoute,
    private productServ: ProductsService
  ) { }

  ngOnInit() {
    this.productID = this.route.snapshot.paramMap.get('id');
    console.log(this.productID);
    this.fetchProduct();
  }
  fetchProduct() {
    this.productServ.fetchProduct(this.productID)
      .subscribe(
      (res: Response) => {
        console.log(res);
        this.products = res['data'];
      },
      err => console.log(err),
    );
  }
  editProduct() {
    this.productServ.editProduct(this.productID, this.products)
      .subscribe(
      res => console.log(res),
      err => console.log(err)
      );
  }

}
