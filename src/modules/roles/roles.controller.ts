import { Controller, Post, Body, Put, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { PermissionsGuard } from '../../common/guards/permission.guard';
import { Permissions } from '../../common/decorators/permission.decorator';
import { Action } from '../../common/enums/action.enum';
import { Resource } from '../../common/enums/resource.enum';

@Controller('roles')
@UseGuards(PermissionsGuard)
export class RolesController {
  constructor(private readonly rolesService: RolesService) { }

  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Post('test-access')
  @Permissions(Action.DELETE, Resource.USERS)
  testAccess() {
    return 'your is access'
  }

  @Put('test-access-2')
  @Permissions(Action.UPDATE, Resource.POSTERS)
  testAccess2() {
    return 'your is access 2'
  }

  @Put('assign-role')
  async assignRole(@Body() body: any) {
    await this.rolesService.assignRoleToUser(body)
    return "success"
  }

}
