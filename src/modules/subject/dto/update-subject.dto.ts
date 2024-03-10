import { IsString, MinLength } from 'class-validator';

export class UpdateSubjectDto {
  @IsString()
  @MinLength(2)
  name: string;
}
