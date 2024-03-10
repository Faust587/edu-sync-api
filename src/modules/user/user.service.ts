import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { CreateUserDto, UpdateUserDto, UserDto } from './dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getAll() {
    return this.userModel.find();
  }

  async getById(id: string): Promise<UserDto> {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new BadRequestException('user with this ID does not exists');
    }
    return user.toObject();
  }

  async getByEmail(email: string): Promise<UserDto> {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new BadRequestException('user with this email does not exists');
    }

    return user.toObject();
  }

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    const isEmailExists = await this.userModel.findOne({
      email: createUserDto.email,
    });

    if (isEmailExists) {
      throw new BadRequestException('This email already used');
    }

    const user = await this.userModel.create(createUserDto);

    return user.toObject();
  }

  async updateById(id: string, updateUserDto: UpdateUserDto): Promise<UserDto> {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new BadRequestException('User with this ID does not exists');
    }

    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
  }

  async deleteById(id: string): Promise<UserDto> {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new BadRequestException('User with this ID does not exists');
    }

    return this.userModel.findByIdAndDelete(id);
  }
}
