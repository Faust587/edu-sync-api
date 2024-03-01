import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateRoleAssignmentDto } from '../../role-assignment/dto/create-role-assignment.dto';

export class UserRegisterDto {
  @IsString()
  @MaxLength(32)
  @IsNotEmpty()
  name: string;

  @IsString()
  @MaxLength(32)
  @IsNotEmpty()
  surname: string;

  @IsString()
  @MaxLength(32)
  @IsNotEmpty()
  patronymic: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 32)
  password: string;

  @IsArray()
  @ValidateNested()
  @Type(() => CreateRoleAssignmentDto)
  roles: CreateRoleAssignmentDto[];

  @IsBoolean()
  @IsOptional()
  isEmailActivated: boolean;
}
