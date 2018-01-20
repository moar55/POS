import { Component, OnInit } from '@angular/core';
import { StockService } from '../stock.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {

  constructor(public stockService: StockService) { }

  ngOnInit() {
    this.stockService.list()
    .subscribe(
      (resp) => console.log(resp),
      (err) => alert(err)
    )
  }
}
