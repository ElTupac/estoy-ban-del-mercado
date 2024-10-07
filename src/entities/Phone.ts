import { UUID } from "crypto";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "phones" })
export class Phone {
  @PrimaryGeneratedColumn("uuid")
  id?: UUID;

  @Column("varchar")
  phone!: string;
}
