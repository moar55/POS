import { ManufacturerService } from './../manufacturer.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manufacturer',
  templateUrl: './manufacturer.component.html',
  styleUrls: ['./manufacturer.component.css']
})
export class ManufacturerComponent implements OnInit {
  manfList: any;
  constructor(
    private manfServ: ManufacturerService,
  ) { }

  ngOnInit() {
    this.getManfList();
  }
  getManfList() {
    this.manfServ.getManfsList()
      .subscribe(
      res => {
        console.log(res);
        this.manfList = res['data'];
      },
      err => console.log(err)
      );
  }
}
