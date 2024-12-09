import { ArrayUnique, IsArray, IsEnum, IsNotEmpty, IsString, ValidateNested } from "class-validator"
import { Action } from "../../../common/enums/action.enum"
import { Type } from "class-transformer"
import { Resource } from "../../../common/enums/resource.enum"

export class CreateRoleDto {
    @IsString()
    name: string

    @ValidateNested()
    @IsNotEmpty()
    @IsArray()
    @Type(() => Permission)
    permissions: Permission[]
}

export class Permission {
    @IsEnum(Resource)
    @IsNotEmpty()
    @IsString()
    resource: Resource

    @IsEnum(Action, { each: true })
    @IsNotEmpty()
    @IsArray()
    @ArrayUnique()
    actions: Action[]
}