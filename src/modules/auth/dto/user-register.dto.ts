import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateRoleAssignmentDto } from '../../role-assignment/dto/create-role-assignment.dto';
import { CreateUserDto } from '../../user/dto';

export class UserRegisterDto {
  @IsArray()
  @ValidateNested()
  @Type(() => CreateRoleAssignmentDto)
  roles: CreateRoleAssignmentDto[];

  @ValidateNested()
  @Type(() => CreateUserDto)
  user: CreateUserDto;
}
