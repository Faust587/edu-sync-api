import { Module } from '@nestjs/common';
import { FacultyService } from './faculty.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Faculty, FacultySchema } from './faculty.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Faculty.name, schema: FacultySchema }]),
  ],
  providers: [FacultyService],
})
export class FacultyModule {}
