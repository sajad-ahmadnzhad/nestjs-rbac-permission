import { BeforeInsert, BeforeUpdate, Column, PrimaryGeneratedColumn } from "typeorm";

export abstract class BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: string

    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMPS" })
    createdAt: Date

    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMPS" })
    updatedAt: Date

    @BeforeInsert()
    setCreatedAt() {
        this.createdAt = new Date()
    }

    @BeforeUpdate()
    setUpdatedAt() {
        this.updatedAt = new Date()
    }
}