import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { University } from '../university/university.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({
  toJSON: {
    transform: (_, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.password;
      delete ret.__v;
    },
  },
  toObject: {
    transform: (_, ret) => {
      ret.id = ret._id;
      delete ret._id;
    },
  },
})
export class User {
  id: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: University.name,
    required: true,
    unique: false,
  })
  university: string;

  @Prop({
    type: MongooseSchema.Types.String,
    required: true,
    unique: false,
  })
  name: string;

  @Prop({
    type: MongooseSchema.Types.String,
    required: true,
    unique: false,
  })
  surname: number;

  @Prop({
    type: MongooseSchema.Types.String,
    required: true,
    unique: false,
  })
  patronymic: string;

  @Prop({
    type: MongooseSchema.Types.String,
    required: true,
    unique: true,
  })
  email: string;

  @Prop({
    type: MongooseSchema.Types.String,
    required: true,
    unique: false,
  })
  password: string;

  @Prop({
    type: MongooseSchema.Types.Boolean,
    required: false,
    unique: false,
    default: false,
  })
  isEmailActivated: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
