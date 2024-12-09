import { SetMetadata } from "@nestjs/common";
import { Action } from "../enums/action.enum";
import { Resource } from "../enums/resource.enum";

export const PERMISSIONS_KEY = 'permissions'

export const Permissions = (action: Action, resource: Resource) =>
    SetMetadata(PERMISSIONS_KEY, { action, resource });