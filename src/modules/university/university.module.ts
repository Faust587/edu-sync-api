import { Module } from '@nestjs/common';
import { UniversityService } from './university.service';
import { MongooseModule } from '@nestjs/mongoose';
import { University, UniversitySchema } from './university.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: University.name, schema: UniversitySchema },
    ]),
  ],
  providers: [UniversityService],
})
export class UniversityModule {}
