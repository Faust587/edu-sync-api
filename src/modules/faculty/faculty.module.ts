import { Module } from '@nestjs/common';
import { FacultyService } from './faculty.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Faculty, FacultySchema } from './faculty.schema';
import { FacultyController } from './faculty.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Faculty.name, schema: FacultySchema }]),
  ],
  controllers: [FacultyController],
  providers: [FacultyService],
})
export class FacultyModule {}
