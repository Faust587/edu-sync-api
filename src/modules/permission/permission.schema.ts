import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

export type PermissionDocument = HydratedDocument<Permission>;

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
export class Permission {
  @Prop({ required: true, type: MongooseSchema.Types.String })
  name: string;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);
