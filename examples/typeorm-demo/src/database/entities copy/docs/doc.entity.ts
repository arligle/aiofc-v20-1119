import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('docs')
export class Doc {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column()
    isActive: boolean;
}