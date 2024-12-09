import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { Permission } from './entities/permission.entity';
import { User } from '../auth/entities/user.entity';
import { UserRole } from './entities/userRoles.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    @InjectRepository(Permission) private readonly permissionRepository: Repository<Permission>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(UserRole) private readonly userRoleRepository: Repository<UserRole>
  ) { }

  async create(createRoleDto: CreateRoleDto) {
    const { name, permissions } = createRoleDto

    const existingRole = await this.roleRepository.findOneBy({ name })

    if (existingRole) {
      throw new ConflictException("Role with this name already exists.")
    }

    let role = this.roleRepository.create({ name })

    role = await this.roleRepository.save(role)

    const permissionEntities = permissions.map((perm) => {
      return this.permissionRepository.create({
        actions: perm.actions,
        resource: perm.resource,
        role
      })
    })

    await this.permissionRepository.save(permissionEntities)

    return role
  }


  async findOneAndThrow(id: number): Promise<Role> {
    const existingRole = await this.roleRepository.findOneBy({ id })

    if (!existingRole) {
      throw new NotFoundException("Role not found")
    }

    return existingRole
  }

  async assignRoleToUser(body: any) {
    const { roleId, userId } = body
    const userRole = this.userRoleRepository.create({
      user: { id: userId },
      role: { id: roleId },
    })
    await this.userRoleRepository.save(userRole)
  }
}
