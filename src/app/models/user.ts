export class User {
  constructor(
    public id: string,
    public userName: string,
    public password: string,
    public twoFactorCode: string
  ) {}
}
