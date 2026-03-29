export interface AuthResponse {
  data: {
    token_type: string;
    expires_in: number;
    access_token: string;
  };
  meta: {
    message: string;
  };
}
