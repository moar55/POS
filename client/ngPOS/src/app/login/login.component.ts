import { Component, OnInit } from '@angular/core';
import { LoginService } from './../login.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loggedIn = false;
  loginData = {
    username: '',
    password: '',
  };

  constructor(public loginService: LoginService, public router: Router) { }

  ngOnInit() {
  }
  submit(loginData) {
    this.loginService.login(this.loginData)
      .subscribe((res) => {
        console.log(res);
        window.localStorage.setItem('isLoggedIn', 'true');
        this.router.navigateByUrl('/');
      },
      err => { console.log(err); }
      );

  }
}
