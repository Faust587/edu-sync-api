export class CreateUserDto {
  name: string;
  surname: string;
  patronymic: string;
  email: string;
  password: string;
  isEmailActivated: boolean;
}
