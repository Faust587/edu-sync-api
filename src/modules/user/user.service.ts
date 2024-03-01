import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(createUserDto: CreateUserDto) {
    const isEmailExists = await this.userModel.findOne({
      email: createUserDto.email,
    });

    if (isEmailExists) {
      throw new BadRequestException('This email already used');
    }

    return this.userModel.create(createUserDto);
  }

  async updateUser() {}

  async getUserById() {}

  async getUserByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  async getAllUsers() {}
}
