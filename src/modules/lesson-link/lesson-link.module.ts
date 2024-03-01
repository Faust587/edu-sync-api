import { Module } from '@nestjs/common';
import { LessonLinkService } from './lesson-link.service';
import { MongooseModule } from '@nestjs/mongoose';
import { LessonLink, LessonLinkSchema } from './lesson-link.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LessonLink.name, schema: LessonLinkSchema },
    ]),
  ],
  providers: [LessonLinkService],
})
export class LessonLinkModule {}
