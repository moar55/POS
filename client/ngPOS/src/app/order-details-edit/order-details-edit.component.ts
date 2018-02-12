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
  order: any;
  // orderDetails: any;
  orderID = this.route.snapshot.paramMap.get('id');
  ngOnInit() {
    this.getOrderDetails(this.orderID);
    // console.log('order items are nginit', this.order.items);
  }

  getOrderDetails(orderID) {
    this.orderServ.getOrderDetails(orderID)
      .subscribe(res => {
        console.log('res is', res);
        this.order = res['data'];
        // this.orderDetails = res.items;
        console.log('order ', this.order);

        console.log('order items are', this.order.items);

      },
        err => console.log(err),
    );
  }
}
