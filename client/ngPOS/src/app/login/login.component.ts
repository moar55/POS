import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './../login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loggedIn = true;
  loginData = {
    userName: '',
    passWord: '',
  };

  constructor(public login: LoginService, public router: Router) { }

  ngOnInit() {
  }
  submit(loginData) {
    this.login.login(this.loginData).subscribe( (res) => {
      console.log(res);
      this.router.navigate(['stock']);
  },
  err => {console.log(err); }
    );

  }
}
