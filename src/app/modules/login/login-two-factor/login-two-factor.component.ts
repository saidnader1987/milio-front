import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-login-two-factor',
  templateUrl: './login-two-factor.component.html',
  styleUrls: ['./login-two-factor.component.css'],
})
export class LoginTwoFactorComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage!: string;
  userName!: string;
  userNameFirstLetter!: string;
  codeForm!: FormGroup;
  twoFactorSetting!: boolean;
  oneTimePasswordSetting!: boolean;

  // MODAL
  @ViewChild('modalWindow') modal!: ElementRef;
  @ViewChild('overlay') overlay!: ElementRef;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  openModal() {
    this.modal.nativeElement.classList.remove('hidden');
    this.modal.nativeElement.classList.add('modal-visible');
    this.overlay.nativeElement.classList.remove('hidden');
  }

  closeModal() {
    this.modal.nativeElement.classList.add('hidden');
    this.modal.nativeElement.classList.remove('modal-visible');
    this.overlay.nativeElement.classList.add('hidden');
    this.codeForm.reset();
  }

  addEscapeListenerToModal() {
    document.addEventListener('keydown', (e) => {
      if (
        e.key === 'Escape' &&
        !this.modal?.nativeElement.classList.contains('hidden')
      ) {
        this.closeModal();
      }
    });
  }

  logOut(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  onSubmit() {
    let code = '';
    for (let i = 1; i <= 6; i++) {
      code += this.codeForm.get('code' + i)?.value;
    }
    this.authService
      .loginWithTwoFactor(this.authService.getUserEmail(), code)
      .subscribe({
        next: () => {
          if (this.authService.isLoggedIn()) {
            this.router.navigate(['/payments']);
          } else {
            this.errorMessage = 'Código incorrecto';
          }
        },
        error: (err) => {},
      });
  }

  ngOnInit() {
    this.userName = this.authService.getUserName();

    this.userNameFirstLetter = this.userName[0];
    this.addEscapeListenerToModal();

    this.oneTimePasswordSetting = this.authService.getOneTimePasswordSetting();
    this.twoFactorSetting = this.authService.getTwoFactorSetting();

    this.codeForm = this.formBuilder.group({
      code1: [
        '',
        [Validators.required, Validators.minLength(1), Validators.maxLength(1)],
      ],
      code2: [
        '',
        [Validators.required, Validators.minLength(1), Validators.maxLength(1)],
      ],
      code3: [
        '',
        [Validators.required, Validators.minLength(1), Validators.maxLength(1)],
      ],
      code4: [
        '',
        [Validators.required, Validators.minLength(1), Validators.maxLength(1)],
      ],
      code5: [
        '',
        [Validators.required, Validators.minLength(1), Validators.maxLength(1)],
      ],
      code6: [
        '',
        [Validators.required, Validators.minLength(1), Validators.maxLength(1)],
      ],
    });
  }
}
