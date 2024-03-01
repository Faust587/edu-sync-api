import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UserLoginDto, UserRegisterDto } from './dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '../../guards/auth.guard';
import { PermissionGuard } from '../../guards/permission.guard';
import { Permissions } from '../../decorators/permission.decorator';
import { PERMISSIONS } from '../../enums/permissions';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @Permissions(PERMISSIONS.GET_ALL_ROLES)
  // @UseGuards(PermissionGuard)
  // @UseGuards(AuthGuard)
  @Post('register')
  async register(
    @Res({ passthrough: true }) res: Response,
    @Body() userRegisterDto: UserRegisterDto,
  ) {
    const { user, accessToken, refreshToken } =
      await this.authService.registerUser(userRegisterDto);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
    });

    return { user, accessToken };
  }

  @Post('login')
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() userLoginDto: UserLoginDto,
  ) {
    const { user, accessToken, refreshToken } =
      await this.authService.loginUser(userLoginDto);

    res.clearCookie('refreshToken');
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
    });

    return { user, accessToken };
  }

  @Permissions(PERMISSIONS.GET_ALL_ROLES)
  @HttpCode(200)
  @Post('logout')
  async logout(@Req() req: Request) {
    const refreshToken = req.cookies['refreshToken'];

    if (!refreshToken) return 'You successfully logout from your account';

    await this.authService.logoutUser(refreshToken);

    return 'You successfully logout from your account';
  }

  @Get('refresh')
  async refresh() {}

  @UseGuards(AuthGuard)
  @Get('test')
  async test(@Req() req: Request) {
    // console.log('test', req['user']);
  }
}
