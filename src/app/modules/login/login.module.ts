import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginPasswordComponent } from './login-password/login-password.component';
import { LoginTwoFactorComponent } from './login-two-factor/login-two-factor.component';
import { LoginUsernameComponent } from './login-username/login-username.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [
    LoginPasswordComponent,
    LoginTwoFactorComponent,
    LoginUsernameComponent,
  ],
})
export class LoginModule {}
