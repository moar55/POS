import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {

  items: Item[]
  sizes: number[]
  constructor() {
    this.items = new Array();
    for (let i in [1, 2, 3])
      this.items.push(new Item())
    this.sizes = Array.from(Array(21).keys()).map((i) => i + 17)
  }

  ngOnInit() {
  }

  addItem() {
    this.items.push(new Item());
  }

  wow() {
    console.log(this.items);
  }

}

class Item {
  r: string;
  color: string;
  size: number;
  quantity: number;
  price: number;
}
