import { BaseTenantEntity } from "@aiofc/typeorm";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('documents')
export class Document extends BaseTenantEntity
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