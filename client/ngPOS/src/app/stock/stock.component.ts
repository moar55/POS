import { Component, OnInit } from '@angular/core';
import { StockService } from '../stock.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  stock: any;
  editMode = false;

  constructor(public stockService: StockService) { }

  ngOnInit() {
    this.stockService.list()
      .subscribe(
      (resp) => {
        console.log(resp);
        this.stock = resp['data'];
        console.log(this.stock);
      },
      (err) => console.log(err)
      );
  }
  editStockItem(stockItem) {
    this.editMode = !this.editMode;
    console.log(stockItem);
  }
  deleteStockItem(stockItem) {
    console.log(stockItem);
  }
}
