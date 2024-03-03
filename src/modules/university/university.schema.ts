import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

export type UniversityDocument = HydratedDocument<University>;

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
export class University {
  id: string;

  @Prop({ required: true, type: MongooseSchema.Types.String, unique: true })
  name: string;
}

export const UniversitySchema = SchemaFactory.createForClass(University);
