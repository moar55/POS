import { ProductsService } from './../products.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  productR: any;
  product: any;

  constructor(
    private route: ActivatedRoute,
    private productServ: ProductsService
  ) { }

  ngOnInit() {
    this.productR = this.route.snapshot.paramMap.get('R');
    console.log(this.productR);
    this.fetchProduct();
  }
  fetchProduct() {
    this.productServ.fetchProduct(this.productR)
      .subscribe(
      (res: Response) => {
        console.log(res);
        this.product = res['data'];
      },
      err => console.log(err),
    );
  }
  editProduct() {
    this.productServ.editProduct(this.productR, this.product)
      .subscribe(
      res => console.log(res),
      err => console.log(err)
      );
  }

}
