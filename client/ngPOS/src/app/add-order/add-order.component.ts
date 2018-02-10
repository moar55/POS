import { OrdersService } from './../orders.service';
import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  manufacturers: any;
  sizes: number[];
  item = {
    R: null,
    color: null,
    quantity: null,
    price: null,
  };
  order = {
    manufacturer_id: null,
    cost: null,
    items: [],
  };
  constructor(private orderServ: OrdersService,
    private router: Router) {
  }
  addItem() {
    const newItem = {
      R: null,
      color: null,
      quantity: null,
      price: null,
    };

    // newItem = Object.assign(newItem, this.item);
    this.order['items'].push(newItem);
    console.log(this.order['items']);

  }

  ngOnInit() {
    this.dropdownList = Array.from(Array(21).keys()).map((i) => {
      return { 'id': i, 'itemName': i + 17 };
    });
    this.selectedItems = [

    ];
    this.dropdownSettings = {
      singleSelection: false,
      text: 'Sizes',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: 'cuppa-dropdown-2'
    };
    this.getManfList();
    // tslint:disable-next-line:forin
    for (const i in [1]) {
      // tslint:disable-next-line:no-shadowed-variable
      this.sizes = Array.from(Array(21).keys()).map((i) => i + 17);
      this.addItem();
    }
    // this.item.sizes = this.selectedItems;
  }
  onItemSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
  }
  OnItemDeSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  onDeSelectAll(items: any) {
    console.log(items);
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
    this.selectedItems = this.selectedItems.map((i) => i.map((item) => item.itemName));
    for (let i = 0; i < this.order.items.length; i++) {
      this.order.items[i].sizes = this.selectedItems[i];
    }

    console.log(this.order.items);

    console.log(this.selectedItems);

    // check if order.items contain empty or null objects
    // this.order.items.forEach(item => {

    //   for (const r in this.order.items) {
    //     if (item.hasOwnProperty(r)) {
    //       // return false;
    //       console.log('kolo tmam ya m3lm');

    //     } else {
    //       // pop those empty objects from the array
    //       this.order.items.splice(this.order.items.indexOf(item), 1);
    //     }
    //   }
    // });
    this.orderServ.addOrder(this.order)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigateByUrl('/orders');
        },
        err => {
          console.log(err);
        }
      );
  }

}
