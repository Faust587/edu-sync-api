import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Faculty } from '../faculty/faculty.schema';

export type SpecialtyDocument = HydratedDocument<Specialty>;

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
export class Specialty {
  id: string;

  @Prop({
    required: true,
    type: MongooseSchema.Types.ObjectId,
    ref: Faculty.name,
  })
  faculty: Faculty;

  @Prop({ required: true, type: MongooseSchema.Types.String })
  name: string;
}

export const SpecialtySchema = SchemaFactory.createForClass(Specialty);
