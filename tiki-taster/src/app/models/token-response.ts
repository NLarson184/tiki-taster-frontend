interface TokenResponse {
  access_token: string;
  refresh_token: string;
  user: TokenUser;
}

interface TokenUser {
  email: string;
  first_name: string;
  last_name: string;
}
