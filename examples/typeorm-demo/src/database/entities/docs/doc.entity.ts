import { TrackedEntity } from "@aiofc/common-entities";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('docs')
export class Doc extends TrackedEntity
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    isActive: boolean;
}