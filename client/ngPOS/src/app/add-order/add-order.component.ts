import { OrdersService } from './../orders.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {
  manufacturers: any;
  item = {
    r: null,
    color: null,
    size: null,
    quantity: null,
    price: null,
  };
  order = {
    manufacturer_id: null,
    cost: null,
    items: [this.item,],
    // created_at: "2018-01-15 12:49:47",
  };
  // items: Item[];
  sizes: number[];
  constructor(private orderServ: OrdersService) {
    // tslint:disable-next-line:forin
    for (const i in [1, 2, 3]) {
      this.addItem();
      // tslint:disable-next-line:no-shadowed-variable
      this.sizes = Array.from(Array(21).keys()).map((i) => i + 17);
    }
  }

  ngOnInit() {
    this.getManfList();
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

  addItem() {
    let newItem = {
      r: null,
      color: null,
      size: null,
      quantity: null,
      price: null,
    };
    newItem = Object.assign(newItem, this.item);
    this.order['items'].push(newItem);
  }

  wow() {
    console.log(this.order['items']);
  }
  calcTheCost() {
    let totalCost = 0;
    let itemCost = 0;
    this.order.items.forEach(item => {
      if (item.quantity > 0) {
        itemCost = item.price * item.quantity;
        totalCost = totalCost + itemCost;
        this.order.cost = totalCost;
      }

    });
    // return totalCost;
  }
  onSubmit() {
    console.log(this.order);
    // check if order.items contain empty or null objects
    this.order.items.forEach(item => {

      for (let r in this.order.items) {
        if (item.hasOwnProperty(r)) {
          // return false;
          console.log('kolo tmam ya m3lm');

        } else {
          // pop those empty objects from the array
          this.order.items.splice(this.order.items.indexOf(item), 1);
        }
      }
    });
    this.orderServ.addOrder(this.order)
      .subscribe(
      res => console.log(res),
      err => console.log(err)
      );
  }

}
