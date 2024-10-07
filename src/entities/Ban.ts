import { UUID } from "crypto";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "bans" })
export class Ban {
  @PrimaryGeneratedColumn("uuid")
  id?: UUID;

  @Column("varchar")
  reason!: string;
  @Column("date")
  expire_date!: string;
  @Column("uuid")
  phone_id!: UUID;
}
