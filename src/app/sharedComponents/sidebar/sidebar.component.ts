import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

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
  selectedOption!: string;

  constructor(private router: Router, private authService: AuthService) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  renderOption(option: string) {
    this.selectedOption = option;
    if (option === 'Perfil') {
      this.router.navigate(['/profile']);
    } else if (option === 'Pagos') {
      this.router.navigate(['/payments']);
    } else {
      this.router.navigate(['/not-implemented']);
    }
  }

  ngOnInit() {
    // this.userId = '1';
    // this.userName = 'Said Nader';
    this.userId = this.authService.getUserId();
    this.userName = this.authService.getUserName();
    this.userNameFirstLetter = this.userName[0];
    this.selectedOption = 'Pagos';
  }
}
