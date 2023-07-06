export class Profile {
  constructor(
    public id: string,
    public name: string,
    public lastName: string,
    public email: string,
    public phoneNumber: string,
    public countryCode: string,
    public twoFactorApp: boolean,
    public oneTimePassword: boolean
  ) {}
}
