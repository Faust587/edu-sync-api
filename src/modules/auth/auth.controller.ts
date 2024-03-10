import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UserLoginDto, UserRegisterDto } from './dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '../../guards/auth.guard';
import { UserDto } from '../user/dto/index';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @Permissions(PERMISSIONS.GET_ALL_ROLES)
  // @UseGuards(PermissionGuard)
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

  @HttpCode(200)
  @UseGuards(AuthGuard)
  @Post('logout')
  async logout(@Req() req: Request) {
    const refreshToken = req.cookies['refreshToken'];

    if (!refreshToken) return 'You successfully logout from your account';

    await this.authService.logoutUser(refreshToken);

    return 'You successfully logout from your account';
  }

  @UseGuards(AuthGuard)
  @HttpCode(200)
  @Get('refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const cookieRefreshToken = req.cookies['refreshToken'];
    const userReq: UserDto = req['user'];
    if (!cookieRefreshToken)
      throw new UnauthorizedException('refresh token is empty');

    const { user, refreshToken, accessToken } =
      await this.authService.refreshToken(cookieRefreshToken, userReq.id);

    res.clearCookie('refreshToken');
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
    });

    return { user, accessToken };
  }

  @UseGuards(AuthGuard)
  @Get('test')
  async test() {
    // console.log('test', req['user']);
  }
}
