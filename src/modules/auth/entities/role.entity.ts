import { BaseEntity } from "../../../common/abstracts/baseEntity.abstract";
import { Column, Entity, OneToMany } from "typeorm";
import { Permission } from "./permission.entity";

@Entity({ name: "roles" })
export class Role extends BaseEntity {
    @Column({ type: "varchar", length: 500, nullable: false })
    name: string

    @OneToMany(() => Permission, (permission) => permission.role)
    permissions: Permission[]
}