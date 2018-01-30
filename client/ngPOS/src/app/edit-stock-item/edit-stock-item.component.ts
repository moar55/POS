import { StockService } from './../stock.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-stock-item',
  templateUrl: './edit-stock-item.component.html',
  styleUrls: ['./edit-stock-item.component.css']
})
export class EditStockItemComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private service: StockService,
  ) { }
  R = this.route.snapshot.paramMap.get('R');
  stockItemFullDetails: any;
  stockItem: any;
  ngOnInit() {
    this.getItemDetails();
    console.log(this.R);
  }
  getItemDetails() {
    // const R = this.route.snapshot.paramMap.get('R');
    this.service.getStockItem(this.R)
      .subscribe(res => {
        this.stockItemFullDetails = res['data'];
        this.stockItem = this.stockItemFullDetails.groups;
        console.log('res is', res);
        console.log('stock item full details is ', this.stockItemFullDetails);
      },
      err => console.log('err is', err)
      );

  }

}
