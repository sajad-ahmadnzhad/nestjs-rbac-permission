import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { Action } from "../enums/action.enum";
import { Resource } from "../enums/resource.enum";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRole } from "../../modules/roles/entities/userRoles.entity";
import { Repository } from "typeorm";
import { PERMISSIONS_KEY } from "../decorators/permission.decorator";

export class PermissionsGuard implements CanActivate {
    constructor(private readonly reflector: Reflector,
        @InjectRepository(UserRole) private readonly userRoleRepository: Repository<UserRole>
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest()
        let { user } = req
        user = { id: 5 }
        const handler = context.getHandler()
        const requiredPermissions = this.reflector.get<{ action: Action, resource: Resource }>(PERMISSIONS_KEY, handler)

        if (!requiredPermissions) return true

        const userRoles = await this.userRoleRepository.find({
            where: { user: { id: user.id } },
            relations: ['role', 'role.permissions']
        })

        const hasPermission = userRoles.some((userRole) =>
            userRole.role.permissions.some(
                (permission) =>
                    permission.actions.includes(requiredPermissions.action) &&
                    permission.resource === requiredPermissions.resource,
            ),
        );

        return hasPermission
    }
}