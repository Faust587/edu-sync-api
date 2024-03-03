import { IsOptional, IsString, Validate } from 'class-validator';
import { IsObjectId } from '../../../utils/mongo-object-id.validator';

export class QueriesGetAll {
  @IsOptional()
  @Validate(IsObjectId)
  universityId: string;

  @IsOptional()
  @IsString()
  name: string;
}
