import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-order-details-edit',
  templateUrl: './order-details-edit.component.html',
  styleUrls: ['./order-details-edit.component.css']
})
export class OrderDetailsEditComponent implements OnInit {

  constructor(private orderServ: OrdersService, private route: ActivatedRoute) { }
  orderDetails: any;
  orderID = this.route.snapshot.paramMap.get('id');
  ngOnInit() {
    this.getOrderDetails(this.orderID);
    console.log('order details are nginit', this.orderDetails);
  }

  getOrderDetails(orderID) {
    this.orderServ.getOrderDetails(orderID)
      .subscribe(res => {
        console.log('res is', res);
        this.orderDetails = res[0];
        console.log('order details are', this.orderDetails);

      },
      err => console.log(err),
    );
  }
}
