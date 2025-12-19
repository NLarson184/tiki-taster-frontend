import { Component, OnInit, NgZone, AfterViewInit, inject, output } from '@angular/core';
import { environment } from '../../../../../environments/environments';
import { AuthService } from '../../../../services/auth-service';

// IMPORTANT: Declare the global 'google' object
declare const google: any;

@Component({
  selector: 'app-google-sign-in',
  // standalone: true,
  templateUrl: './google-sign-in.html',
  styleUrls: ['./google-sign-in.scss'],
})
export class GoogleSignIn implements AfterViewInit {
  authService = inject(AuthService);
  private readonly GOOGLE_CLIENT_ID = environment.googleClientId;

  readonly loggedIn = output<boolean>();

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit(): void {
    if (typeof google !== 'undefined') {
      this.initializeGoogleSignIn();
    }
  }

  private initializeGoogleSignIn(): void {
    // Initialize the Google Identity Services client
    google.accounts.id.initialize({
      client_id: this.GOOGLE_CLIENT_ID,
      callback: (response: any) => this.handleCredentialResponse(response), // The callback when sign-in is successful
      auto_select: false, // Prevents automatic sign-in
      cancel_on_tap_outside: true,
    });

    // Render the 'Sign in with Google' button
    google.accounts.id.renderButton(document.getElementById('gsi-button-container'), {
      theme: 'outline', // 'filled_blue', 'outline'
      size: 'large', // 'large', 'medium', 'small'
      type: 'standard', // 'standard', 'icon'
      text: 'signin_with', // 'signin_with', 'signup_with', 'continue_with'
      width: '300',
    });
  }

  /**
   * Handles the response containing the JWT ID Token
   * @param response The credential response object from the Google SDK
   */
  private handleCredentialResponse(response: any): void {
    // The Google SDK runs outside of Angular's zone, so use ngZone.run()
    // to ensure Angular's change detection is triggered after processing
    this.ngZone.run(() => {
      const idToken = response.credential;

      // Securely send the ID token to your backend API for verification
      this.authService.socialLogin(idToken).then(
        (loggedIn) => {
          this.loggedIn.emit(loggedIn);
        },
        (error) => {
          throw error;
        }
      );
    });
  }
}
