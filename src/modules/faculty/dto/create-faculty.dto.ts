import { IsString, Validate } from 'class-validator';
import { IsObjectId } from '../../../utils/mongo-object-id.validator';

export class CreateFacultyDto {
  @IsString()
  name: string;

  @Validate(IsObjectId)
  university: string;
}
