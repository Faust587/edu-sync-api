import { SetMetadata } from '@nestjs/common';
import { PERMISSIONS } from '../enums/permissions';

export const PERMISSION_KEY = 'permissions';
export const Permissions = (...permissions: PERMISSIONS[]) =>
  SetMetadata(PERMISSION_KEY, permissions);
