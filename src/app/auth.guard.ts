import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, RouterState } from '@angular/router';
import { AuthService } from './auth.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {

    }

    canActivate() {
        if (this.authService.isLoggedIn()) {
            return true;
        }
        this.router.navigate(['/']);
        return false;
    }
}