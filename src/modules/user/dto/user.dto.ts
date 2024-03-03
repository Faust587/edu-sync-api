import {
  IsBoolean,
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { IsObjectId } from '../../../utils/mongo-object-id.validator';

export class UserDto {
  @Validate(IsObjectId)
  id: string;

  @Validate(IsObjectId)
  university: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(1)
  @MaxLength(32)
  name: string;

  @IsString()
  @MinLength(1)
  @MaxLength(32)
  surname: string;

  @IsString()
  @MinLength(1)
  @MaxLength(32)
  patronymic: string;

  @IsString()
  @MinLength(3)
  @MaxLength(12)
  password: string;

  @IsBoolean()
  isEmailActivated: boolean;
}
