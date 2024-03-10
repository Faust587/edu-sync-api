import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RefreshToken } from './refresh-token.schema';
import { Model } from 'mongoose';
import { CreateRefreshTokenDto } from './dto';

@Injectable()
export class RefreshTokenService {
  constructor(
    @InjectModel(RefreshToken.name)
    private refreshTokenModel: Model<RefreshToken>,
  ) {}

  async createRefreshToken(createRefreshTokenDto: CreateRefreshTokenDto) {
    const { userId, token } = createRefreshTokenDto;
    return this.refreshTokenModel.create({ token, user: userId });
  }

  async findRefreshTokenByUserId(id: string) {
    return this.refreshTokenModel.findById(id);
  }

  async deleteByTokenName(token: string) {
    return this.refreshTokenModel.deleteOne({ token });
  }

  async getAll() {}
}
