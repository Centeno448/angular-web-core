export class AuthRegisterModel {
  constructor(
    public username: string,
    public email: string,
    public password: string,
    public verify: string
  ) {}
}
