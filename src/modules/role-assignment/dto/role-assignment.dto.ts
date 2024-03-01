import { IsOptional, Validate } from 'class-validator';
import { IsObjectId } from '../../../utils/mongo-object-id.validator';
import { RoleDto } from '../../role/dto/role.dto';

export class RoleAssignmentDto {
  @Validate(IsObjectId)
  id: string;

  @Validate(IsObjectId)
  user: string;

  @Validate(IsObjectId)
  role: RoleDto;

  @Validate(IsObjectId)
  @IsOptional()
  university?: string;

  @Validate(IsObjectId)
  @IsOptional()
  faculty?: string;

  @Validate(IsObjectId)
  @IsOptional()
  specialty?: string;

  @Validate(IsObjectId)
  @IsOptional()
  studyGroup?: string;

  @Validate(IsObjectId)
  @IsOptional()
  lesson?: string;
}
