export class CreateUserDto {
  readonly acceptedTerms: boolean;
  readonly email: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly password: string;
}
