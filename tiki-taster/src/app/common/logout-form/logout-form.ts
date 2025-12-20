import { Component, inject, signal } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout-form',
  imports: [MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './logout-form.html',
  styleUrl: './logout-form.scss',
})
export class LogoutForm {
  readonly dialogRef = inject(MatDialogRef<LogoutForm>);

  authService = inject(AuthService);

  isLoggedOut = signal(false);

  constructor(private router: Router) {}

  logOut(): void {
    this.isLoggedOut.set(true);
    setTimeout(() => {
      this.authService.logout();
      this.router.navigate(['']);
      this.dialogRef.close();
    }, 1000);
  }
}
