import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto, GetByIdParams, UpdateUserDto } from './dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/')
  @HttpCode(200)
  async getAll() {
    return this.userService.getAll();
  }

  @Get('/:id')
  @HttpCode(200)
  async getById(@Param() { id }: GetByIdParams) {
    return this.userService.getById(id);
  }

  @Post('/')
  @HttpCode(201)
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Put('/:id')
  @HttpCode(200)
  async updateById(
    @Param() { id }: GetByIdParams,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateById(id, updateUserDto);
  }

  @Delete('/:id')
  @HttpCode(200)
  async deleteById(@Param() { id }: GetByIdParams) {
    return this.userService.deleteById(id);
  }
}
