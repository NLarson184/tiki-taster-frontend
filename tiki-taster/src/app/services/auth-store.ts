import { computed, inject, Injectable, signal } from '@angular/core';
import { AuthService } from './auth-service';

@Injectable({
  providedIn: 'root',
})
export class AuthStore {
  // Signals for managing authentication state
  private _accessToken = signal<string | null>(null);
  private _refreshToken = signal<string | null>(null);
  private _userEmail = signal<string | null>(null);
  private _firstName = signal<string | null>(null);

  // Computed signal for easy access to login status
  isAuthenticated = computed(() => !!this._accessToken());

  constructor() {
    this.loadTokens();
  }

  /** Loads tokens from secure storage (e.g., sessionStorage for demo) */
  private loadTokens() {
    if (typeof window !== 'undefined') {
      const access = sessionStorage.getItem('access_token');
      const refresh = sessionStorage.getItem('refresh_token');
      const email = sessionStorage.getItem('user_email');
      const firstName = sessionStorage.getItem('user_first_name');

      if (access) {
        this._accessToken.set(access);
        this._refreshToken.set(refresh);
        this._userEmail.set(email);
        this._firstName.set(firstName);
      }
    }
  }

  /** Saves and updates token state */
  setTokens(response: TokenResponse) {
    this._accessToken.set(response.access_token);
    this._refreshToken.set(response.refresh_token);

    sessionStorage.setItem('access_token', response.access_token);
    sessionStorage.setItem('refresh_token', response.refresh_token);
  }

  setUserData(user: User) {
    this._userEmail.set(user.email);
    this._firstName.set(user.name);

    sessionStorage.setItem('user_email', user.email);
    sessionStorage.setItem('user_first_name', user.name);
  }

  /** Gets the current access token for interceptors */
  getAccessToken(): string | null {
    return this._accessToken();
  }

  /** Clears all authentication state */
  logout() {
    this._accessToken.set(null);
    this._refreshToken.set(null);
    this._userEmail.set(null);
    this._firstName.set(null);
    sessionStorage.clear();
  }

  getUserEmail(): string | null {
    return this._userEmail();
  }

  getUserFirstName(): string | null {
    return this._firstName();
  }
}
