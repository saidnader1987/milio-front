import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const url: string = route.url.join('/');
    if (url === 'login/password' && !this.authService.isEmailStepCompleted()) {
      this.router.navigate(['/login']);
      return false;
    }
    if (
      url === 'login/2factor' &&
      (!this.authService.isEmailStepCompleted() ||
        !this.authService.isPasswordStepCompleted())
    ) {
      if (!this.authService.isEmailStepCompleted()) {
        this.router.navigate(['/login']);
      } else {
        this.router.navigate(['/login/password']);
      }
      return false;
    }

    if (
      (url === 'payments' || url === 'profile' || url === 'not-implemented') &&
      !this.authService.isLoggedIn()
    ) {
      if (!this.authService.isEmailStepCompleted()) {
        this.router.navigate(['/login']);
      } else if (!this.authService.isPasswordStepCompleted()) {
        this.router.navigate(['/login/password']);
      } else {
        this.router.navigate(['/login/2factor']);
      }
      return false;
    }
    return true;
  }
}
