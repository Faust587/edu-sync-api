import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserLoginDto, UserRegisterDto, JwtPayloadDto } from './dto';
import { genSalt, hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';
// import { RoleAssignmentService } from '../role-assignment/role-assignment.service';
// import { RoleAssignmentDto } from '../role-assignment/dto/role-assignment.dto';

@Injectable()
export class AuthService {
  constructor(
    private refreshTokenService: RefreshTokenService,
    // private roleAssignmentService: RoleAssignmentService,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async registerUser(userRegisterDto: UserRegisterDto) {
    const {
      // roles,
      user,
    } = userRegisterDto;

    const salt = await genSalt(10);
    const hashedPassword = await hash(
      `${user.password}${process.env.PASSWORD_HASH_SALT}`,
      salt,
    );

    const userObj = await this.userService.create({
      ...user,
      password: hashedPassword,
    });

    // const userRoles = await this.roleAssignmentService.createRoleAssignment(
    //   roles,
    //   userObj.id,
    // );

    const payload: JwtPayloadDto = {
      id: userObj.id,
      isEmailActivated: user.isEmailActivated,
    };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: process.env.ACCESS_TOKEN_EXP,
      secret: process.env.JWT_SECRET,
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: process.env.REFRESH_TOKEN_EXP,
      secret: process.env.JWT_SECRET,
    });

    await this.refreshTokenService.createRefreshToken({
      userId: userObj.id,
      token: refreshToken,
    });

    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  async loginUser(userLoginDto: UserLoginDto) {
    const { email, password } = userLoginDto;

    const user = await this.userService.getByEmail(email);

    if (!user) {
      throw new BadRequestException('User with this email does not exists');
    }

    const isPasswordValid = await compare(
      `${password}${process.env.PASSWORD_HASH_SALT}`,
      user.password,
    );

    if (!isPasswordValid) {
      throw new BadRequestException('Password is not valid');
    }

    const payload: JwtPayloadDto = {
      id: user.id,
      isEmailActivated: user.isEmailActivated,
    };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: process.env.ACCESS_TOKEN_EXP,
      secret: process.env.JWT_SECRET,
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: process.env.REFRESH_TOKEN_EXP,
      secret: process.env.JWT_SECRET,
    });

    await this.refreshTokenService.createRefreshToken({
      userId: user.id,
      token: refreshToken,
    });

    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  async logoutUser(refreshToken: string) {
    return this.refreshTokenService.deleteByTokenName(refreshToken);
  }

  async refreshToken(refreshToken: string, userId: string) {
    this.refreshTokenService.deleteByTokenName(refreshToken);

    const user = await this.userService.getById(userId);

    const payload: JwtPayloadDto = {
      id: user.id,
      isEmailActivated: user.isEmailActivated,
    };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: process.env.ACCESS_TOKEN_EXP,
      secret: process.env.JWT_SECRET,
    });

    const newRefreshToken = this.jwtService.sign(payload, {
      expiresIn: process.env.REFRESH_TOKEN_EXP,
      secret: process.env.JWT_SECRET,
    });

    await this.refreshTokenService.createRefreshToken({
      userId: user.id,
      token: newRefreshToken,
    });

    return {
      user,
      accessToken,
      refreshToken: newRefreshToken,
    };
  }
}
