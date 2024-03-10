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
  Req,
  UseGuards,
} from '@nestjs/common';
import { SubjectService } from './subject.service';
import {
  CreateSubjectDto,
  GetByIdParams,
  QueriesGetAll,
  UpdateSubjectDto,
} from './dto';
import { AuthGuard } from '../../guards/auth.guard';
import { Request } from 'express';
import { UserDto } from '../user/dto';

@Controller('subject')
export class SubjectController {
  constructor(private subjectService: SubjectService) {}

  @UseGuards(AuthGuard)
  @Get('/')
  @HttpCode(200)
  async getAll(@Query() { name }: QueriesGetAll, @Req() req: Request) {
    const user: UserDto = req['user'];
    return this.subjectService.getAll(name, user.university.id);
  }

  @UseGuards(AuthGuard)
  @Get('/:id')
  @HttpCode(200)
  async getById(@Param() { id }: GetByIdParams, @Req() req: Request) {
    const user: UserDto = req['user'];
    return this.subjectService.getById(id, user.university.id);
  }

  @UseGuards(AuthGuard)
  @Post('/')
  @HttpCode(201)
  async create(
    @Body() createSubjectDto: CreateSubjectDto,
    @Req() req: Request,
  ) {
    const user: UserDto = req['user'];
    return this.subjectService.create(createSubjectDto, user.university.id);
  }

  @UseGuards(AuthGuard)
  @Put('/:id')
  @HttpCode(200)
  async update(
    @Body() updateSubjectDto: UpdateSubjectDto,
    @Param() { id }: GetByIdParams,
    @Req() req: Request,
  ) {
    const user: UserDto = req['user'];
    return this.subjectService.update(updateSubjectDto, id, user.university.id);
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  @HttpCode(200)
  async deleteById(@Param() { id }: GetByIdParams, @Req() req: Request) {
    const user: UserDto = req['user'];
    return this.subjectService.deleteById(id, user.university.id);
  }
}
