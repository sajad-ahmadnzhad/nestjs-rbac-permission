import { Column, Entity } from "typeorm";
import { BaseEntity } from "../../../common/abstracts/baseEntity.abstract";

@Entity({ name: "users" })
export class User extends BaseEntity {
    @Column({ type: "varchar", length: 500, nullable: false })
    fullName: string

    @Column({ type: "varchar", length: 100, nullable: false })
    username: string

    @Column({ type: "varchar", nullable: false })
    email: string

    @Column({ type: "varchar", nullable: false, select: false })
    password: string
}