import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Subject } from './subject.schema';
import { Model } from 'mongoose';
import { CreateSubjectDto, SubjectDto, UpdateSubjectDto } from './dto';

@Injectable()
export class SubjectService {
  constructor(
    @InjectModel(Subject.name) private subjectModel: Model<Subject>,
  ) {}

  async getAll(
    nameFilter: string,
    universityId: string,
  ): Promise<SubjectDto[]> {
    const nameRegex = new RegExp(nameFilter ?? '', 'i');
    return this.subjectModel
      .find({
        name: { $regex: nameRegex },
        university: universityId,
      })
      .populate('university');
  }

  async getById(id: string, universityId: string): Promise<SubjectDto> {
    const subject = await this.subjectModel.findOne({
      _id: id,
      university: universityId,
    });

    if (!subject) {
      throw new BadRequestException(`subject with id '${id}' does not exists`);
    }

    return subject.populate('university');
  }

  async create(
    createSubjectDto: CreateSubjectDto,
    universityId: string,
  ): Promise<SubjectDto> {
    const { name } = createSubjectDto;

    const subject = await this.subjectModel.create({
      name,
      university: universityId,
    });

    return subject.populate('university');
  }

  async update(
    updateSubjectDto: UpdateSubjectDto,
    subjectId: string,
    universityId: string,
  ): Promise<SubjectDto> {
    const subject = await this.subjectModel.findOne({
      _id: subjectId,
      university: universityId,
    });

    if (!subject) {
      throw new BadRequestException(
        `subject with id '${subjectId}' does not exists`,
      );
    }

    return this.subjectModel
      .findByIdAndUpdate(subjectId, updateSubjectDto, {
        new: true,
      })
      .populate('university');
  }

  async deleteById(id: string, universityId: string): Promise<SubjectDto> {
    return this.subjectModel.findOneAndDelete({
      _id: id,
      university: universityId,
    });
  }
}
