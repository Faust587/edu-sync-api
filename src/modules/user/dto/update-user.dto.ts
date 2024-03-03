import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(32)
  name: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(32)
  surname: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(32)
  patronymic: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(12)
  password: string;

  @IsOptional()
  @IsBoolean()
  isEmailActivated: boolean;
}
