import { Component, OnInit } from '@angular/core';

import { Profile } from 'src/app/models/profile';
import { ProfileService } from 'src/app/services/profile.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { SidebarService } from 'src/app/services/side-bar.service';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.css'],
})
export class ProfileDetailComponent implements OnInit {
  userProfile: Profile | undefined;
  userId!: string;
  phoneNumber!: string;
  constructor(
    private sideBarService: SidebarService,
    private authService: AuthService,
    private profileService: ProfileService,
    private router: Router
  ) {}

  renderPreviousComponent() {
    this.sideBarService.toggleProfileSelected();
    if (this.sideBarService.getSelectedOption() === 'Pagos') {
      this.router.navigate(['/payments']);
    } else {
      this.router.navigate(['/not-implemented']);
    }
  }

  getProfileInfo(id: string) {
    this.profileService.getUserProfileInfo(id).subscribe({
      next: (res) => {
        const { status, data } = res;
        if (status) {
          this.userProfile = data;
          if (this.userProfile)
            this.phoneNumber = this.maskPhoneNumber(
              this.userProfile.phoneNumber
            );
        }
      },
      error: (err) => {},
    });
  }

  onPhoneNumberChange() {
    this.phoneNumber = this.maskPhoneNumber(this.phoneNumber);
  }

  maskPhoneNumber(phoneNumber: string) {
    if (phoneNumber && phoneNumber.length >= 4) {
      return '*'.repeat(phoneNumber.length - 4) + phoneNumber.slice(-4);
    } else {
      return phoneNumber;
    }
  }

  toggleButtons(option: string) {
    if (option === 'twoFactor' && this.userProfile) {
      this.userProfile.twoFactorApp = this.userProfile.twoFactorApp
        ? false
        : true;
    } else if (option === 'oneTime' && this.userProfile) {
      this.userProfile.oneTimePassword = this.userProfile.oneTimePassword
        ? false
        : true;
    }
  }

  get userFirstLetter(): string {
    if (this.userProfile) return this.userProfile.name[0];
    else return '';
  }

  get userName(): string {
    if (this.userProfile) return this.userProfile.name;
    else return '';
  }

  get userLastName(): string {
    if (this.userProfile) return this.userProfile.lastName;
    else return '';
  }

  get countryCode(): string {
    if (this.userProfile) return this.userProfile.countryCode;
    else return '+57';
  }

  get maskedPhoneNumber() {
    return this.userProfile
      ? '*'.repeat(this.userProfile.phoneNumber.length - 4) +
          this.userProfile.phoneNumber.slice(-4)
      : '';
  }

  get userEmail() {
    if (this.userProfile) return this.userProfile.email;
    else return '';
  }

  get twoFactorSetting() {
    if (this.userProfile) return this.userProfile.twoFactorApp;
    else return false;
  }

  get oneTimePasswordSetting() {
    if (this.userProfile) return this.userProfile.oneTimePassword;
    else return false;
  }

  ngOnInit() {
    // this.userId = this.authService.getUserId();
    this.userId = '1';
    this.getProfileInfo(this.userId);
  }
}
