import { OrdersService } from './../orders.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  ordersList: any;
  manufacturers: any;

  constructor(private ordersService: OrdersService) { }

  ngOnInit() {
    this.getOrdersList();
    this.getManfsList();
    // setTimeout(() => {
    //   this.whatever();
    // }, 5000);
    // this.ordersList.manufacturer_id = this.manufacturers.name;
  }
  getOrdersList() {
    this.ordersService.list()
      .subscribe(
        (res) => {
          console.log('res is  ', res);
          this.ordersList = res;
          console.log('orders list is ', this.ordersList);

        },
        err => console.log(err)
      );
  }
  getManfsList() {
    this.ordersService.getManfs()
      .subscribe(
        res => {
          console.log('manf list is ', res);
          this.manufacturers = res;
        },
        err => console.log(err)
      );
  }

  delete(order) {
    this.ordersService.deleteOrder(order.id)
      .subscribe(
        res => console.log(res),
        err => console.log(err),


    );
  }

  // whatever() {
  //   for (let index = 0; index <= this.ordersList.length; index++) {
  //     this.ordersList.manufacturer_id = this.manufacturers.find(x => x.id = this.ordersList.manufacturer_id).name;
  //   }

  // }


}
