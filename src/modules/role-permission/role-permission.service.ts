import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RolePermission } from './role-permission.schema';

@Injectable()
export class RolePermissionService {
  constructor(
    @InjectModel(RolePermission.name)
    private rolePermissionModel: Model<RolePermission>,
  ) {}

  async getPermissionsByRoleId(roleId: string) {
    return this.rolePermissionModel
      .find({ role: roleId })
      .populate(['permission']);
  }
}
