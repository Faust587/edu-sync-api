import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS } from '../enums/permissions';
import { PERMISSION_KEY } from '../decorators/permission.decorator';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();

    const userPermissions = req['user']['userPermissions'];

    const permissions = this.reflector.getAllAndOverride<PERMISSIONS[]>(
      PERMISSION_KEY,
      [context.getHandler(), context.getClass()],
    );

    return permissions.some((str) => userPermissions.includes(str));
  }
}
