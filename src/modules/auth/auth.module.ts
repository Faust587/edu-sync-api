import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { RefreshTokenModule } from '../refresh-token/refresh-token.module';
import { RolePermissionModule } from '../role-permission/role-permission.module';
import { RoleAssignmentModule } from '../role-assignment/role-assignment.module';

@Module({
  imports: [
    RefreshTokenModule,
    UserModule,
    RoleAssignmentModule,
    RolePermissionModule,
    JwtModule.register({ global: true, secret: process.env.JWT_SECRET }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
