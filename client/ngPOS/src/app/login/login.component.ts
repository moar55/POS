import { Component, OnInit } from '@angular/core';
import { LoginService } from './../login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loggedIn = false;
  loginData = {
    userName: '',
    passWord: '',
  };

  constructor(public login: LoginService) { }

  ngOnInit() {
  }
  submit(loginData) {
    this.login.login(this.loginData).subscribe( (res) => {
      console.log(res);
      // this.router.navigate(['stock']);
  },
  err => {console.log(err); }
    );

  }
}
