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

  constructor(
    private route: ActivatedRoute,
    private productServ: ProductsService
  ) { }

  ngOnInit() {
    this.productID = this.route.snapshot.paramMap.get('id');
    console.log(this.productID);
  }

}
