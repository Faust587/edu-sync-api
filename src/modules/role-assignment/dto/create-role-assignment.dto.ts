import { IsOptional, Validate } from 'class-validator';
import { IsObjectId } from '../../../utils/mongo-object-id.validator';

export class CreateRoleAssignmentDto {
  @Validate(IsObjectId)
  role: string;

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
