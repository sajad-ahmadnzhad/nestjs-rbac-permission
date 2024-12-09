import { ArrayUnique, IsEnum, IsString, ValidateNested } from "class-validator"
import { Action } from "../../../common/enums/action.enum"
import { Type } from "class-transformer"
import { Resource } from "src/common/enums/resource.enum"

export class CreateRoleDto {
    @IsString()
    name: string

    @ValidateNested()
    @Type(() => Permission)
    permissions: Permission[]
}

export class Permission {
    @IsEnum(Resource)
    resource: Resource

    @IsEnum(Action, { each: true })
    @ArrayUnique()
    actions: Action[]
}