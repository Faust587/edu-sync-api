import { Module } from '@nestjs/common';
import { RolePermissionController } from './role-permission.controller';
import { RolePermissionService } from './role-permission.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RolePermission, RolePermissionSchema } from './role-permission.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RolePermission.name, schema: RolePermissionSchema },
    ]),
  ],
  controllers: [RolePermissionController],
  providers: [RolePermissionService],
  exports: [RolePermissionService],
})
export class RolePermissionModule {}
