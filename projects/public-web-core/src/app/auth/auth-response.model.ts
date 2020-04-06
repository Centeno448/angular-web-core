export interface AuthResponseModel {
  id: number;
  username: string;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}
