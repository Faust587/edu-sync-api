import { IsString } from 'class-validator';

export class UpdateUniversityDto {
  @IsString()
  name: string;
}
