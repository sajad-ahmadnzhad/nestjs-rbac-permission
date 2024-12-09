import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Permission } from './entities/permission.entity';
import { User } from '../auth/entities/user.entity';
import { UserRole } from './entities/userRoles.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role, Permission, User, UserRole])
  ],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule { }
