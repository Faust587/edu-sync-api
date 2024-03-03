import { IsString, Validate } from 'class-validator';
import { IsObjectId } from '../../../utils/mongo-object-id.validator';

export class FacultyDto {
  @Validate(IsObjectId)
  id: string;

  @IsString()
  name: string;
}
