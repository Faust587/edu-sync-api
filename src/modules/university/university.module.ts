import { Module } from '@nestjs/common';
import { UniversityService } from './university.service';
import { MongooseModule } from '@nestjs/mongoose';
import { University, UniversitySchema } from './university.schema';
import { UniversityController } from './university.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: University.name, schema: UniversitySchema },
    ]),
  ],
  controllers: [UniversityController],
  providers: [UniversityService],
})
export class UniversityModule {}
