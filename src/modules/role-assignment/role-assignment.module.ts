import { Module } from '@nestjs/common';
import { RoleAssignmentService } from './role-assignment.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleAssignment, RoleAssignmentSchema } from './role-assignment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RoleAssignment.name, schema: RoleAssignmentSchema },
    ]),
  ],
  providers: [RoleAssignmentService],
  exports: [RoleAssignmentService],
})
export class RoleAssignmentModule {}
