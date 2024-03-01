import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Permission } from '../permission/permission.schema';
import { Role } from '../role/role.schema';

export type RolePermissionDocument = HydratedDocument<RolePermission>;

@Schema()
export class RolePermission {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Role.name })
  role: Role;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Permission.name })
  permission: Permission;
}

export const RolePermissionSchema =
  SchemaFactory.createForClass(RolePermission);
