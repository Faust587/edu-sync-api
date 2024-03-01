import { Module } from '@nestjs/common';
import { StudyGroupService } from './study-group.service';
import { MongooseModule } from '@nestjs/mongoose';
import { StudyGroup, StudyGroupSchema } from './study-group.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: StudyGroup.name, schema: StudyGroupSchema },
    ]),
  ],
  providers: [StudyGroupService],
})
export class StudyGroupModule {}
