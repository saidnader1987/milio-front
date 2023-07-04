import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginUsernameComponent } from './modules/login/login-username/login-username.component';
import { LoginPasswordComponent } from './modules/login/login-password/login-password.component';
import { LoginTwoFactorComponent } from './modules/login/login-two-factor/login-two-factor.component';
import { MainLayoutComponent } from './sharedComponents/main-layout/main-layout.component';
import { PaymentDetailComponent } from './modules/payment/payment-detail/payment-detail.component';
import { ProfileDetailComponent } from './modules/profile/profile-detail/profile-detail.component';
import { NotImplementedComponent } from './sharedComponents/not-implemented/not-implemented.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginUsernameComponent },
  {
    path: 'login/password',
    component: LoginPasswordComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login/2factor',
    component: LoginTwoFactorComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'payments',
        component: PaymentDetailComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'profile',
        component: ProfileDetailComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'not-implemented',
        component: NotImplementedComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];

// FOR DEVELOPMENT ONLY
// const routes: Routes = [
//   {
//     path: '',
//     component: MainLayoutComponent,
//     children: [
//       {
//         path: 'payments',
//         component: PaymentDetailComponent,
//       },
//       {
//         path: 'profile',
//         component: ProfileDetailComponent,
//       },
//       {
//         path: 'not-implemented',
//         component: NotImplementedComponent,
//       },
//     ],
//   },
// ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
