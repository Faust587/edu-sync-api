import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UniversityService } from './university.service';
import {
  CreateUniversityDto,
  GetByIdParams,
  GetByNameParams,
  UpdateUniversityDto,
} from './dto';

@Controller('university')
export class UniversityController {
  constructor(private universityService: UniversityService) {}

  @Get('/')
  @HttpCode(200)
  async getAll(@Query('name') name?: string) {
    return this.universityService.getAll(name);
  }

  @Get('/id/:id')
  @HttpCode(200)
  async getById(@Param() { id }: GetByIdParams) {
    return this.universityService.getById(id);
  }

  @Get('/name/:name')
  @HttpCode(200)
  async getByName(@Param() { name }: GetByNameParams) {
    return this.universityService.getByName(name);
  }

  @Post('/')
  @HttpCode(201)
  async create(@Body() createUniversityDto: CreateUniversityDto) {
    return this.universityService.create(createUniversityDto);
  }

  @Put('/:id')
  @HttpCode(200)
  async updateById(
    @Param() { id }: GetByIdParams,
    @Body() updateUniversityDto: UpdateUniversityDto,
  ) {
    return this.universityService.updateById(id, updateUniversityDto);
  }

  @Delete('/:id')
  @HttpCode(200)
  async deleteById(@Param() { id }: GetByIdParams) {
    return this.universityService.deleteById(id);
  }
}
