import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public loginService: LoginService) { }

  loggedIn: boolean;

  ngOnInit() {
    this.loggedIn = window.localStorage.getItem('isLoggedIn') == "true"
  }

  logout() {
    this.loginService.logout();
  }

}
