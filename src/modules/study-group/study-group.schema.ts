import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Specialty } from '../specialty/specialty.schema';

export type StudyGroupDocument = HydratedDocument<StudyGroup>;

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
export class StudyGroup {
  id: string;

  @Prop({
    required: true,
    type: MongooseSchema.Types.ObjectId,
    ref: Specialty.name,
  })
  specialty: Specialty;

  @Prop({ required: true, type: MongooseSchema.Types.String })
  name: string;
}

export const StudyGroupSchema = SchemaFactory.createForClass(StudyGroup);
