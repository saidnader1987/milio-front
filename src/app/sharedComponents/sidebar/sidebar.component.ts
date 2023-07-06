import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { SidebarService } from 'src/app/services/side-bar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  userId!: string;
  userName!: string;
  userNameFirstLetter!: string;
  isHovering = false;

  constructor(
    private sideBarService: SidebarService,
    private router: Router,
    private authService: AuthService
  ) {}

  logout() {
    this.authService.logout();
    this.sideBarService.updateSelectedOption('Pagos');
    this.router.navigate(['/login']);
  }

  renderOption(option: string) {
    if (option === 'Perfil') {
      this.sideBarService.toggleProfileSelected();
      this.router.navigate(['/profile']);
    } else {
      if (this.sideBarService.isProfileSelected())
        this.sideBarService.toggleProfileSelected();
      this.sideBarService.updateSelectedOption(option);
      if (option === 'Pagos') {
        this.router.navigate(['/payments']);
      } else {
        this.router.navigate(['/not-implemented']);
      }
    }
  }

  get selectedOption(): string {
    if (!this.sideBarService.isProfileSelected()) {
      return this.sideBarService.getSelectedOption();
    } else return 'Profile;';
  }

  ngOnInit() {
    // FOR DEVELOPMENT ONLY
    // this.userId = '1';
    // this.userName = 'Said Nader';
    this.userId = this.authService.getUserId();
    this.userName = this.authService.getUserName();
    this.userNameFirstLetter = this.userName[0];
    this.sideBarService.updateSelectedOption('Pagos');
  }
}
