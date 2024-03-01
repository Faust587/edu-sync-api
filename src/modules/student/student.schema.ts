import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Role } from '../role/role.schema';

export type StudentDocument = HydratedDocument<Student>;

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
export class Student {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
  })
  id: MongooseSchema.Types.ObjectId;

  @Prop({
    type: MongooseSchema.Types.String,
    required: false,
    unique: true,
  })
  telegramId: string;

  @Prop({
    type: MongooseSchema.Types.String,
    required: false,
    unique: true,
  })
  discordId: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    required: true,
    unique: true,
  })
  group: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: Role.name,
    required: true,
    unique: false,
  })
  role: string;

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

export const StudentSchema = SchemaFactory.createForClass(Student);
