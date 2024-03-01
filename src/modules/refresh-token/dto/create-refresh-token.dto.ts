import { User } from '../../user/user.schema';

export class CreateRefreshTokenDto {
  user: User;
  token: string;
}
