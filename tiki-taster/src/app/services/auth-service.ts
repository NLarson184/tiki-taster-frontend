import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ICredentials } from '../models/credentials';
import { firstValueFrom, Observable } from 'rxjs';
import { AuthStore } from './auth-store';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private authStore = inject(AuthStore);
  private baseUrl = environment.apiUrl;

  /** Standard email/password login */
  async login(credentials: ICredentials): Promise<void> {
    const loginUrl = `${this.baseUrl}/auth/token`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    let body = new HttpParams();
    for (const key in credentials) {
      if (credentials.hasOwnProperty(key)) {
        body = body.set(key, (credentials as any)[key]);
      }
    }

    try {
      const response = await firstValueFrom(
        this.http.post<TokenResponse>(loginUrl, body, { headers: headers })
      );

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

  async socialLogin(accessToken: string): Promise<boolean> {
    const socialLoginUrl = `${this.baseUrl}/auth/convert-token/`;

    try {
      const payload = {
        grant_type: 'convert_token',
        client_id: environment.djangoClientId,
        backend: 'google-identity',
        token: accessToken,
      };

      const response = await firstValueFrom(this.http.post<TokenResponse>(socialLoginUrl, payload));

      if (response && response.access_token) {
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

    return true;
  }

  async getUserData(): Promise<User> {
    const token = this.authStore.getAccessToken();

    // This is where a real Interceptor would take over.
    if (!token) {
      throw new Error('Authentication token is missing.');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return await firstValueFrom(
      this.http.get<User>(`${this.baseUrl}/account/details`, {
        headers: headers,
      })
    );
  }
}
