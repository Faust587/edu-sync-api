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
import { FacultyService } from './faculty.service';
import { CreateFacultyDto, GetByIdParams, GetByNameParams } from './dto/index';
import { UpdateFacultyDto } from './dto/update-faculty.dto';

@Controller('faculty')
export class FacultyController {
  constructor(private facultyService: FacultyService) {}

  @Get('/')
  @HttpCode(200)
  async getAll(@Query('name') name: string) {
    return this.facultyService.getAll(name);
  }

  @Get('/id/:id')
  @HttpCode(200)
  async getById(@Param() { id }: GetByIdParams) {
    return this.facultyService.getById(id);
  }

  @Get('/name/:name')
  @HttpCode(200)
  async getByName(@Param() { name }: GetByNameParams) {
    return this.facultyService.getByName(name);
  }

  @Post('/')
  @HttpCode(201)
  async create(@Body() createFacultyDto: CreateFacultyDto) {
    return this.facultyService.create(createFacultyDto);
  }

  @Put('/:id')
  @HttpCode(200)
  async updateById(
    @Param() { id }: GetByIdParams,
    @Body() updateFacultyDto: UpdateFacultyDto,
  ) {
    return this.facultyService.updateById(id, updateFacultyDto);
  }

  @Delete('/:id')
  @HttpCode(200)
  async deleteById(@Param() { id }: GetByIdParams) {
    return this.facultyService.deleteById(id);
  }
}
