import { IsString } from 'class-validator';

export class UpdateFacultyDto {
  @IsString()
  name: string;
}
