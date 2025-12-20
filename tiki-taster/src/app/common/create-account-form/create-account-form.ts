import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel, MatError, MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AuthService } from '../../services/auth-service';
import { Credentials } from '../../models/credentials';
import { AuthStore } from '../../services/auth-store';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-create-account-form',
  imports: [
    MatButton,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatError,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinner,
  ],
  templateUrl: './create-account-form.html',
  styleUrl: './create-account-form.scss',
})
export class CreateAccountForm {
  readonly dialogRef = inject(MatDialogRef<CreateAccountForm>);
  private formBuilder = inject(FormBuilder);
  authService = inject(AuthService);
  authStore = inject(AuthStore);

  createAccountForm: FormGroup;
  isLoading = signal(false);
  isLoggedIn = signal(false);
  errorMessage = signal<string | null>(null);

  constructor() {
    this.createAccountForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      ageVerification: [false, [Validators.requiredTrue]],
      name: ['', [Validators.required]],
    });
  }

  get emailControl() {
    return this.createAccountForm.get('email')!;
  }

  get nameControl() {
    return this.createAccountForm.get('name')!;
  }

  get ageVerificationControl() {
    return this.createAccountForm.get('ageVerification')!;
  }

  get passwordControl() {
    return this.createAccountForm.get('password')!;
  }

  switchToLogin() {
    this.dialogRef.close('openLogin');
  }

  async createAccount() {
    const emailValue = this.createAccountForm.get('email')!.value;
    const passwordValue = this.createAccountForm.get('password')!.value;
    const user: User = {
      email: emailValue,
      password: passwordValue,
      name: this.createAccountForm.get('name')!.value,
    };

    const credentials = new Credentials(emailValue, passwordValue);

    try {
      await this.authService.createAccount(user);
      await this.authService.login(credentials);
      await this.authService.getUserData().then((user) => {
        this.authStore.setUserData(user);
      });
      this.createAccountForm.reset();
    } catch (error: any) {
      this.errorMessage.set(error.message || 'An unknown error occurred during login.');
    } finally {
      this.isLoading.set(false);
    }

    if (this.authStore.isAuthenticated()) {
      this.logInSuccess();
    }
  }

  // Trigger log in success message and close dialog after delay
  async logInSuccess(): Promise<void> {
    // Check if we have basic user data and populate if not
    if (this.authStore.getUserFirstName() == null) {
      await this.authService.getUserData().then((user) => {
        this.authStore.setUserData(user);
      });
    }
    this.isLoggedIn.set(true);

    setTimeout(() => {
      this.closeDialog();
    }, 1000);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
