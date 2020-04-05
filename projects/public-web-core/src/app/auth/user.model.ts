export class User {
  constructor(
    public id: number,
    public username: string,
    private _accesstoken: string,
    private _tokenExpirationDate: Date,
    private _refreshToken: string
  ) {}

  get token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }

    return this._accesstoken;
  }

  get refreshToken() {
    return this._refreshToken;
  }
}
