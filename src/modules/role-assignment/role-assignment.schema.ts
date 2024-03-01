import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { User } from '../user/user.schema';
import { Role } from '../role/role.schema';
import { University } from '../university/university.schema';
import { Faculty } from '../faculty/faculty.schema';
import { Specialty } from '../specialty/specialty.schema';
import { StudyGroup } from '../study-group/study-group.schema';
import { Lesson } from '../lesson/lesson.schema';

export type RoleAssignmentDocument = HydratedDocument<RoleAssignment>;

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
export class RoleAssignment {
  @Prop({ required: true, ref: User.name, type: MongooseSchema.Types.ObjectId })
  user: User;

  @Prop({ required: true, ref: Role.name, type: MongooseSchema.Types.ObjectId })
  role: Role;

  @Prop({
    required: false,
    ref: University.name,
    type: MongooseSchema.Types.ObjectId,
  })
  university: University;

  @Prop({
    required: false,
    ref: Faculty.name,
    type: MongooseSchema.Types.ObjectId,
  })
  faculty: Faculty;

  @Prop({
    required: false,
    ref: Specialty.name,
    type: MongooseSchema.Types.ObjectId,
  })
  specialty: Specialty;

  @Prop({
    required: false,
    ref: StudyGroup.name,
    type: MongooseSchema.Types.ObjectId,
  })
  studyGroup: StudyGroup;

  @Prop({
    required: false,
    ref: Lesson.name,
    type: MongooseSchema.Types.ObjectId,
  })
  lesson: Lesson;
}

export const RoleAssignmentSchema =
  SchemaFactory.createForClass(RoleAssignment);
