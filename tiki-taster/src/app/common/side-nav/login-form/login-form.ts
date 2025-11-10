import { Component, inject, signal } from '@angular/core';
import { AuthStore } from '../../../services/auth-store';
import { AuthService } from '../../../services/auth-service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { environment } from '../../../../environments/environments';
import { MatFormField, MatLabel, MatInput, MatInputModule } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { GoogleSignIn } from './google-sign-in/google-sign-in';
import { Credentials } from '../../../models/credentials';

@Component({
  selector: 'app-login-form',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormField,
    MatLabel,
    MatButton,
    MatInput,
    GoogleSignIn,
  ],
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss',
})
export class LoginForm {
  readonly dialogRef = inject(MatDialogRef<LoginForm>);

  authStore = inject(AuthStore);
  authService = inject(AuthService);
  private formBuilder = inject(FormBuilder);

  // Make the env variables accessible by the template
  env = environment;

  loginForm: FormGroup;
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  constructor() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });

    this.authStore.isAuthenticated;
  }

  ngOnInit(): void {
    this.checkSocialLoginRedirect();
  }

  get emailControl() {
    return this.loginForm.get('email')!;
  }

  get passwordControl() {
    return this.loginForm.get('password')!;
  }

  async login() {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    // Check validity of the Reactive Form
    if (this.loginForm.invalid) {
      this.errorMessage.set('Please fill out the form correctly.');
      this.isLoading.set(false);
      // Mark all controls as touched to show validation errors immediately
      this.loginForm.markAllAsTouched();
      return;
    }

    // Convert form to a more structured "Credentials"
    const credentials = new Credentials(
      this.loginForm.get('email')!.value,
      this.loginForm.get('password')!.value
    );

    try {
      // Call the service, which handles the API request and state update
      await this.authService.login(credentials);
      this.loginForm.reset();
    } catch (error: any) {
      this.errorMessage.set(error.message || 'An unknown error occurred during login.');
    } finally {
      this.isLoading.set(false);
    }
  }

  // Checks for OAuth 'code' or 'token' in the URL query parameters
  checkSocialLoginRedirect() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      this.errorMessage.set(
        'Code detected in URL. Now exchanging code with DRF backend for JWT...'
      );
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
