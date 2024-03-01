import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { User } from '../user/user.schema';

export type RefreshTokenDocument = HydratedDocument<RefreshToken>;

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
export class RefreshToken {
  @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: User.name })
  user: User;

  @Prop({ required: true, type: MongooseSchema.Types.String })
  token: string;
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);
