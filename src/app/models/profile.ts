export class Profile {
  constructor(
    public id: string,
    public name: string,
    public lastName: string,
    public phoneNumber: string,
    public phoneCountry: string,
    public twoFactorApp: boolean,
    public oneTimePassword: boolean
  ) {}
}
