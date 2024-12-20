import { Column, Entity, ManyToOne } from "typeorm";
import { Action } from "../../../common/enums/action.enum";
import { Resource } from "../../../common/enums/resource.enum";
import { Role } from "./role.entity";
import { BaseEntity } from "../../../common/abstracts/baseEntity.abstract";

@Entity({ name: "permissions" })
export class Permission extends BaseEntity {
    @Column({ type: "enum", nullable: false, enum: Resource })
    resource: Resource

    @Column({ type: 'jsonb', nullable: false })
    actions: Action[]

    @ManyToOne(() => Role, role => role.permissions, { onDelete: 'CASCADE' })
    role: Role
}