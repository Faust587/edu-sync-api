import { IsString, Validate } from 'class-validator';
import { IsObjectId } from '../../../utils/mongo-object-id.validator';

export class GetByIdParams {
  @Validate(IsObjectId)
  id: string;
}

export class GetByNameParams {
  @IsString()
  name: string;
}
