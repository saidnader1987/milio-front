import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-password',
  templateUrl: './login-password.component.html',
  styleUrls: ['./login-password.component.css'],
})
export class LoginPasswordComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage!: string;
  email!: string;
  showPassword = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  ngOnInit() {
    this.email = this.authService.getUserEmail();
    this.loginForm = this.formBuilder.group({
      password: ['', Validators.required],
    });
  }
  onSubmit(): void {
    const { password } = this.loginForm.value;
    this.authService.loginWithPassword(this.email, password).subscribe({
      next: () => {
        if (this.authService.isPasswordStepCompleted()) {
          this.router.navigate(['/login/2factor']);
        } else {
          this.errorMessage = 'Contraseña inválida';
        }
      },
      error: (err) => {},
    });
  }
}
