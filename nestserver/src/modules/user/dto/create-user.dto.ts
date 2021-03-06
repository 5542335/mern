export class CreateUserDto {
  readonly email: string;
  readonly password: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly acceptedTerms: boolean;
  readonly role: string[];
  readonly active: boolean;
}
