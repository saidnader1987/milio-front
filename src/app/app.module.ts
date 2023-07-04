import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './sharedComponents/main-layout/main-layout.component';
import { SidebarComponent } from './sharedComponents/sidebar/sidebar.component';
import { NotImplementedComponent } from './sharedComponents/not-implemented/not-implemented.component';
import { LoginModule } from './modules/login/login.module';
import { PaymentModule } from './modules/payment/payment.module';
import { ProfileModule } from './modules/profile/profile.module';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    SidebarComponent,
    NotImplementedComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    ProfileModule,
    PaymentModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
