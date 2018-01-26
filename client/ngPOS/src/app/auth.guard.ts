import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('isLoggedIn') === 'true') {
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }

    public static loggedIn () {
        console.log(localStorage.getItem('isLoggedIn'));
        return localStorage.getItem('isLoggedIn') === 'true' ;
    }
}
