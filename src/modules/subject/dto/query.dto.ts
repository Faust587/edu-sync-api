import { IsOptional, IsString } from 'class-validator';

export class QueriesGetAll {
  @IsOptional()
  @IsString()
  name: string;
}
