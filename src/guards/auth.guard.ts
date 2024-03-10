import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { RolePermissionService } from '../modules/role-permission/role-permission.service';
import { UserService } from '../modules/user/user.service';
import { JwtPayloadDto } from '../modules/auth/dto/index';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private rolePermissionService: RolePermissionService,
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      throw new ForbiddenException('Authorization Bearer Header is empty');
    }

    if (!authHeader.startsWith('Bearer ')) {
      throw new ForbiddenException('Authorization Bearer Header is invalid');
    }

    const refreshToken = authHeader.split('Bearer ')[1];

    try {
      const payload: JwtPayloadDto = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_SECRET,
      });

      const user = await this.userService.getById(payload.id);

      // const permissions = rolePermissions.map(
      //   (rolePermission) => rolePermission.permission.name,
      // );

      req.user = {
        ...user,
        // userPermissions: permissions,
      };
    } catch (e) {
      if (e instanceof TokenExpiredError) {
        throw new ForbiddenException('Access is expired');
      }
      console.log(e);
      throw new ForbiddenException('Access token is invalid');
    }

    return true;
  }
}
