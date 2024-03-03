import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { University } from './university.schema';
import { Model } from 'mongoose';
import { UniversityDto, UpdateUniversityDto, CreateUniversityDto } from './dto';

@Injectable()
export class UniversityService {
  constructor(
    @InjectModel(University.name) private universityModel: Model<University>,
  ) {}

  async getAll(nameFilter?: string): Promise<UniversityDto[]> {
    const nameRegex = new RegExp(nameFilter ?? '', 'i');

    return this.universityModel.find({ name: { $regex: nameRegex } });
  }

  async getById(id: string): Promise<UniversityDto> {
    const university = await this.universityModel.findById(id);

    if (!university) {
      throw new BadRequestException('University with this ID does not exists');
    }

    return university;
  }

  async getByName(name: string): Promise<UniversityDto> {
    const university = await this.universityModel.findOne({ name });

    if (!university) {
      throw new BadRequestException(
        'University with this NAME does not exists',
      );
    }

    return university;
  }

  async create(
    createUniversityDto: CreateUniversityDto,
  ): Promise<UniversityDto> {
    const { name } = createUniversityDto;
    const university = await this.universityModel.findOne({ name });

    if (university) {
      throw new BadRequestException('University with this NAME already exists');
    }

    return this.universityModel.create(createUniversityDto);
  }

  async updateById(
    id: string,
    updateUniversityDto: UpdateUniversityDto,
  ): Promise<UniversityDto> {
    const university = await this.universityModel.findById(id);

    if (!university) {
      throw new BadRequestException('University with this ID does not exists');
    }

    return this.universityModel.findByIdAndUpdate(id, updateUniversityDto, {
      new: true,
    });
  }

  async deleteById(id: string): Promise<UniversityDto> {
    const university = await this.universityModel.findById(id);

    if (!university) {
      throw new BadRequestException('University with this ID does not exists');
    }

    return this.universityModel.findByIdAndDelete(id);
  }
}
