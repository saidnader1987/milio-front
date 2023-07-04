import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-username',
  templateUrl: './login-username.component.html',
  styleUrls: ['./login-username.component.css'],
})
export class LoginUsernameComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage!: string;
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
    });
  }
  onSubmit(): void {
    const { email } = this.loginForm.value;
    this.authService.loginWithEmail(email).subscribe({
      next: () => {
        if (this.authService.isEmailStepCompleted()) {
          this.router.navigate(['/login/password']);
        } else {
          this.errorMessage = 'Usuario inválido';
        }
      },
      error: (err) => {},
    });
  }
}
