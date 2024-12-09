import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { Permission } from './entities/permission.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    @InjectRepository(Permission) private readonly permissionRepository: Repository<Permission>
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


  async findOneAndThrow(name: string): Promise<Role> {
    const existingRole = await this.roleRepository.findOneBy({ name })

    if (!existingRole) {
      throw new NotFoundException("Role not found")
    }

    return existingRole
  }

}
