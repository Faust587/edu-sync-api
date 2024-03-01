import { Module } from '@nestjs/common';
import { SpecialtyService } from './specialty.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Specialty, SpecialtySchema } from './specialty.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Specialty.name, schema: SpecialtySchema },
    ]),
  ],
  providers: [SpecialtyService],
})
export class SpecialtyModule {}
