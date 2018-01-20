import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showNavbar = false;
  ngOnInit() {
    if (window.localStorage.getItem('isLoggedIn') === 'true') {
    this.showNavbar = true;
    console.log(this.showNavbar);
    } else {
    this.showNavbar = false;
  }
}


}
