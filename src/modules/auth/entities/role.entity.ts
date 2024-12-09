import { BaseEntity } from "../../../common/abstracts/baseEntity.abstract";
import { Column, Entity, OneToMany } from "typeorm";

@Entity({ name: "roles" })
export class Role extends BaseEntity {
    @Column({ type: "varchar", length: 500 })
    name: string

    @OneToMany((permission) => permission.role)
    permissions: Permission[]
}