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
        }
      },
      error: (err) => {},
    });
  }

  ngOnInit() {
    // this.userId = this.authService.getUserId();
    this.userId = '1';
    this.getProfileInfo(this.userId);
  }
}
