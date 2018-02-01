import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {
  item = {
    r: null,
    color: null,
    size: null,
    quantity: null,
    price: null,
  };
  order = {
    manufacturer: null,
    cost: null,
    items: [this.item,],
    // created_at: "2018-01-15 12:49:47",
  };
  // items: Item[];
  sizes: number[];
  constructor() {
    console.log(this.order.items);

    // tslint:disable-next-line:forin
    for (const i in [1, 2, 3]) {
      // tslint:disable-next-line:no-shadowed-variable
      this.sizes = Array.from(Array(21).keys()).map((i) => i + 17);
    }
  }

  ngOnInit() {

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
  onSubmit() {
    console.log(this.order);
  }

}


