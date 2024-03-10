import { Module } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Subject, SubjectSchema } from './subject.schema';
import { UserModule } from '../user/user.module';
import { SubjectController } from './subject.controller';
import { AuthModule } from '../auth/auth.module';
import { RolePermissionModule } from '../role-permission/role-permission.module';

@Module({
  imports: [
    AuthModule,
    RolePermissionModule,
    UserModule,
    MongooseModule.forFeature([{ name: Subject.name, schema: SubjectSchema }]),
  ],
  controllers: [SubjectController],
  providers: [SubjectService],
})
export class SubjectModule {}
