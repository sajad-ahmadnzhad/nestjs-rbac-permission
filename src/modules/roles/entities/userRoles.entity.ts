import { User } from "src/modules/auth/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Role } from "./role.entity";

@Entity({ name: "user_roles" })
export class UserRole {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    user: User;

    @ManyToOne(() => Role, { onDelete: 'CASCADE' })
    role: Role;
}