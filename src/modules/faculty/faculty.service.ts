import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Faculty } from './faculty.schema';
import { Model } from 'mongoose';
import { CreateFacultyDto, FacultyDto, UpdateFacultyDto } from './dto';

@Injectable()
export class FacultyService {
  constructor(
    @InjectModel(Faculty.name) private facultyModel: Model<Faculty>,
  ) {}

  async getAll(
    nameFilter?: string,
    universityId?: string,
  ): Promise<FacultyDto[]> {
    const nameRegex = new RegExp(nameFilter ?? '', 'i');
    const universityIdFilter = universityId ? { university: universityId } : {};

    return this.facultyModel.find({
      name: { $regex: nameRegex },
      ...universityIdFilter,
    });
  }

  async getById(id: string): Promise<FacultyDto> {
    const faculty = await this.facultyModel.findById(id);

    if (!faculty) {
      throw new BadRequestException('Faculty with this id does not exists');
    }

    return faculty;
  }

  async getByName(name: string): Promise<FacultyDto> {
    const faculty = await this.facultyModel.findOne({ name });

    if (!faculty) {
      throw new BadRequestException('Faculty with this name does not exists');
    }

    return faculty;
  }

  async create(createFacultyDto: CreateFacultyDto): Promise<FacultyDto> {
    const { name, university } = createFacultyDto;
    const isFacultyWithNameExists = !!(await this.facultyModel.findOne({
      name,
      university,
    }));

    if (isFacultyWithNameExists) {
      throw new BadRequestException('Faculty with this name already exists');
    }

    return this.facultyModel.create(createFacultyDto);
  }

  async updateById(
    id: string,
    updateFacultyDto: UpdateFacultyDto,
  ): Promise<FacultyDto> {
    const isFacultyWithNameExists = !!(await this.facultyModel.findById(id));

    if (!isFacultyWithNameExists) {
      throw new BadRequestException('Faculty with this id does NOT exists');
    }

    return this.facultyModel.findByIdAndUpdate(id, updateFacultyDto, {
      new: true,
    });
  }

  async deleteById(id: string): Promise<FacultyDto> {
    const isFacultyWithIdExists = !!(await this.facultyModel.findById(id));

    if (!isFacultyWithIdExists) {
      throw new BadRequestException('Faculty with this id does NOT exists');
    }

    return this.facultyModel.findByIdAndDelete(id);
  }
}
