import { IsString, Validate } from 'class-validator';
import { IsObjectId } from '../../../utils/mongo-object-id.validator';
import { Type } from 'class-transformer';
import { UniversityDto } from '../../university/dto';

export class SubjectDto {
  @Validate(IsObjectId)
  id: string;

  @Type(() => UniversityDto)
  university: UniversityDto;

  @IsString()
  name: string;
}
