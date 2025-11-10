import { environment } from '../../environments/environments';

export interface ICredentials {
  grant_type: string;
  username: string;
  password: string;
  client_id: string;
  // client_secret: string;
}

export class Credentials implements ICredentials {
  // Default Values
  grant_type: string = 'password';
  client_id: string = environment.djangoClientId;
  // client_secret: string = environment.djangoClientSecret;

  // User Provided
  username: string;
  password: string;

  constructor(email: string, password: string) {
    this.username = email;
    this.password = password;
  }
}
