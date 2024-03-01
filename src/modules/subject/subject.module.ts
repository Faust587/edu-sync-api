import { Module } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Subject, SubjectSchema } from './subject.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Subject.name, schema: SubjectSchema }]),
  ],
  providers: [SubjectService],
})
export class SubjectModule {}
