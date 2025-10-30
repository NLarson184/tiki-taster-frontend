import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { AuthStore } from './auth-store';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private authStore = inject(AuthStore);
  private baseUrl = environment.apiUrl;

  /** Standard email/password login */
  async login(credentials: Credentials): Promise<void> {
    const loginUrl = `${this.baseUrl}/auth/login`;

    try {
      const response = await firstValueFrom(this.http.post<TokenResponse>(loginUrl, credentials));

      if (response && response.access_token) {
        // Delegate state update to the AuthStore
        this.authStore.setTokens(response);
      } else {
        throw new Error('Invalid token response from server.');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      throw new Error(error.error?.detail || 'Login failed. Check credentials or server status.');
    }
  }

  async socialLogin(idToken: string): Promise<void> {
    const socialLoginUrl = `${this.baseUrl}/auth/convert-token/`;

    try {
      const payload = {
        grant_type: 'convert_token',
        client_id: '4ZxwUL4w1k5DosSnOfPzKQLYyPRjj3NaNo3dJmuT',
        backend: 'google-identity',
        token: idToken,
      };

      const response = await firstValueFrom(this.http.post<TokenResponse>(socialLoginUrl, payload));

      if (response && response.access_token) {
        // The actual email will be returned by the backend after token verification.
        // We'll use a placeholder for now, but a real response should contain user details.
        this.authStore.setTokens(response);
      } else {
        throw new Error('Invalid token response from server after social login.');
      }
    } catch (error: any) {
      console.error('Google social login error:', error);
      // Provide specific error feedback from the server if available
      throw new Error(
        error.error?.non_field_errors?.[0] ||
          'Google authentication failed. Token may be invalid or expired.'
      );
    }
  }
}
