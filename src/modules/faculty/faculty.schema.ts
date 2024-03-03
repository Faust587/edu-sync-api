import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { University } from '../university/university.schema';

export type FacultyDocument = HydratedDocument<Faculty>;

@Schema({
  toJSON: {
    transform: (_, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    },
  },
  toObject: {
    transform: (_, ret) => {
      ret.id = ret._id.toHexString();
      delete ret._id;
    },
  },
})
export class Faculty {
  id: string;

  @Prop({ required: true, type: MongooseSchema.Types.String })
  name: string;

  @Prop({
    required: true,
    type: MongooseSchema.Types.ObjectId,
    ref: University.name,
  })
  university: string;
}

export const FacultySchema = SchemaFactory.createForClass(Faculty);
