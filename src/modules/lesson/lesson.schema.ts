import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { StudyGroup } from '../study-group/study-group.schema';
import { Subject } from '../subject/subject.schema';
import { LessonLink } from '../lesson-link/lesson-link.schema';

export type LessonDocument = HydratedDocument<Lesson>;

@Schema({
  toJSON: {
    transform: (_, ret) => {
      ret.id = ret._id;
      delete ret._id;
    },
  },
  toObject: {
    transform: (_, ret) => {
      ret.id = ret._id.toHexString();
      delete ret._id;
    },
  },
})
export class Lesson {
  id: string;

  @Prop({
    required: true,
    type: MongooseSchema.Types.ObjectId,
    ref: StudyGroup.name,
  })
  group: StudyGroup;

  @Prop({
    required: true,
    type: MongooseSchema.Types.ObjectId,
    ref: Subject.name,
  })
  subject: Subject;

  @Prop({
    required: true,
    type: MongooseSchema.Types.ObjectId,
    ref: LessonLink.name,
  })
  lessonLink: LessonLink;

  @Prop({ required: true, type: MongooseSchema.Types.String })
  name: string;

  @Prop({ required: false, type: MongooseSchema.Types.String })
  description: string;

  @Prop({ required: false, type: MongooseSchema.Types.String })
  room: string;

  @Prop({ required: false, type: MongooseSchema.Types.Boolean })
  isOnline: boolean;

  @Prop({ required: true, type: MongooseSchema.Types.Number })
  dayOfWeek: number;

  @Prop({ required: true, type: MongooseSchema.Types.Number })
  hour: number;

  @Prop({ required: true, type: MongooseSchema.Types.Number })
  minutes: number;
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);
