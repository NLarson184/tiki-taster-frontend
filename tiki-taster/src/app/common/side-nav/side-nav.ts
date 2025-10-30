import { Component, computed, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { AuthStore } from '../../services/auth-store';
import { MatDialog } from '@angular/material/dialog';
import { LoginForm } from './login-form/login-form';

@Component({
  selector: 'app-side-nav',
  imports: [MatToolbarModule, RouterLink, MatButtonModule],
  templateUrl: './side-nav.html',
  styleUrl: './side-nav.scss',
})
export class SideNav {
  authStore = inject(AuthStore);
  dialog = inject(MatDialog);
  isLoggedIn = computed(() => this.authStore.isAuthenticated);

  userFirstName = computed(() => this.authStore.getUserFirstName());

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginForm);

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
