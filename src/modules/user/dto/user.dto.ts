import {
  IsBoolean,
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { IsObjectId } from '../../../utils/mongo-object-id.validator';
import { UniversityDto } from '../../university/dto';
import { Type } from 'class-transformer';

export class UserDto {
  @Validate(IsObjectId)
  id: string;

  @Type(() => UniversityDto)
  university: UniversityDto;

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
