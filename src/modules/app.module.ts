import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { RolePermissionModule } from './role-permission/role-permission.module';
import { FacultyModule } from './faculty/faculty.module';
import { RefreshTokenModule } from './refresh-token/refresh-token.module';
import { SpecialtyModule } from './specialty/specialty.module';
import { StudyGroupModule } from './study-group/study-group.module';
import { StudentModule } from './student/student.module';
import { SubjectModule } from './subject/subject.module';
import { UniversityModule } from './university/university.module';
import { RoleAssignmentModule } from './role-assignment/role-assignment.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(`${process.env.DATABASE_URI}`),
    AuthModule,
    UserModule,
    RoleModule,
    PermissionModule,
    RolePermissionModule,
    FacultyModule,
    RefreshTokenModule,
    SpecialtyModule,
    StudyGroupModule,
    StudentModule,
    SubjectModule,
    UniversityModule,
    RoleAssignmentModule,
  ],
})
export class AppModule {}
