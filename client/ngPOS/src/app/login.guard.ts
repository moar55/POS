import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class LoginGuard implements CanActivate {

    constructor(private router: Router) {
    }

canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    if(!AuthGuard.loggedIn())
        return true;
    else {
        this.router.navigate(['/'])
        return false;
    }
  }
}
