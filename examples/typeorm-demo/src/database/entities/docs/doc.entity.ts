import { AbstractBaseTrackedEntity } from "@aiofc/typeorm";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('docs')
export class Doc extends AbstractBaseTrackedEntity
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