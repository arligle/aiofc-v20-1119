import { BaseTenantEntity } from "@aiofc/common-entities";
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