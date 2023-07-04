import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;
  private isEmailStepComplete = false;
  private isPasswordStepComplete = false;
  private isTwoFactorStepComplete = false;
  private justLoggedIn = false;
  private userId = undefined;
  private userEmail = undefined;
  private userName = undefined;

  constructor(private userService: UserService) {}

  loginWithEmail(email: string): Observable<any> {
    return this.userService.authenticateEmail(email).pipe(
      tap((res) => {
        this.isEmailStepComplete = res.success;
        this.userEmail = res.email;
      })
    );
  }

  loginWithPassword(email: string, password: string): Observable<any> {
    return this.userService.authenticatePassword(email, password).pipe(
      tap((res) => {
        this.isPasswordStepComplete = res.success;
        this.userId = res.id;
        this.userName = res.name;
      })
    );
  }

  loginWithTwoFactor(email: string, code: string): Observable<any> {
    return this.userService.authenticateTwoFactor(email, code).pipe(
      tap((res) => {
        this.isTwoFactorStepComplete = res.success;
        if (
          this.isEmailStepComplete &&
          this.isPasswordStepComplete &&
          this.isTwoFactorStepComplete
        ) {
          this.isAuthenticated = true;
          this.justLoggedIn = true;
        }
      })
    );
  }

  logout(): void {
    this.isAuthenticated = false;
    this.isEmailStepComplete = false;
    this.isPasswordStepComplete = false;
    this.isTwoFactorStepComplete = false;
    this.justLoggedIn = false;
    this.userEmail = undefined;
    this.userId = undefined;
    this.userName = undefined;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  hasJustLoggedIn(): boolean {
    let res;
    if (this.justLoggedIn) {
      res = true;
      this.justLoggedIn = false;
    } else {
      res = false;
    }
    return res;
  }

  isEmailStepCompleted(): boolean {
    return this.isEmailStepComplete;
  }

  isPasswordStepCompleted(): boolean {
    return this.isPasswordStepComplete;
  }

  isTwoFactorStepCompleted(): boolean {
    return this.isTwoFactorStepComplete;
  }

  getUserEmail(): any {
    return this.userEmail;
  }

  getUserId(): any {
    return this.userId;
  }

  getUserName(): any {
    return this.userName;
  }
}
