import { Component, computed, inject, signal } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { AuthStore } from '../../services/auth-store';
import { MatDialog } from '@angular/material/dialog';
import { LoginForm } from '../login-form/login-form';
import { filter } from 'rxjs';
import { LogoutForm } from '../logout-form/logout-form';

@Component({
  selector: 'app-side-nav',
  imports: [MatToolbarModule, RouterLink, MatButtonModule],
  templateUrl: './side-nav.html',
  styleUrl: './side-nav.scss',
})
export class SideNav {
  authStore = inject(AuthStore);
  dialog = inject(MatDialog);
  router = inject(Router);

  isLoggedIn = computed(() => this.authStore.isAuthenticated());
  userFirstName = computed(() => this.authStore.getUserFirstName());
  currentLink = signal('/');

  constructor() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentLink.set(event.url);
      });
  }

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginForm);
  }

  openLogoutDialog(): void {
    const dialogRef = this.dialog.open(LogoutForm);
  }
}
