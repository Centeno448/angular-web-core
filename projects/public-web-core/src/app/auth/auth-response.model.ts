export interface AuthResponseModel {
  id: number;
  username: string;
  role: string;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}
