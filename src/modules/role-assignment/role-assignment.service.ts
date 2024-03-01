import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RoleAssignment } from './role-assignment.schema';
import { Model } from 'mongoose';
import { CreateRoleAssignmentDto } from './dto/create-role-assignment.dto';
import { RoleAssignmentDto } from './dto/role-assignment.dto';

@Injectable()
export class RoleAssignmentService {
  constructor(
    @InjectModel(RoleAssignment.name)
    private roleAssignment: Model<RoleAssignment>,
  ) {}

  async createRoleAssignment(
    roleAssignmentsDto: CreateRoleAssignmentDto[],
    userId: string,
  ): Promise<RoleAssignmentDto[]> {
    const roleAssignments = await this.roleAssignment
      .insertMany(roleAssignmentsDto.map((data) => ({ ...data, user: userId })))
      .then(async (insertedDocs) => {
        return await this.roleAssignment.populate(insertedDocs, [
          { path: 'user' },
          { path: 'role' },
          { path: 'university' },
          { path: 'faculty' },
          { path: 'specialty' },
          { path: 'studyGroup' },
          { path: 'lesson' },
        ]);
      });

    return roleAssignments.map((roleAssignment) => ({
      id: roleAssignment.id,
      user: userId,
      role: roleAssignment.role,
      university: roleAssignment?.university.id,
      faculty: roleAssignment?.faculty?.id,
      specialty: roleAssignment?.specialty?.id,
      studyGroup: roleAssignment?.studyGroup?.id,
      lesson: roleAssignment?.lesson?.id,
    }));
  }

  async getRoleAssignmentsByUserId(userId: string) {
    return this.roleAssignment.find({ user: userId });
  }
}
