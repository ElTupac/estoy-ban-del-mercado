import { UUID } from "crypto";
import { Repository } from "typeorm";
import { Ban } from "../entities";

export const getPhoneBans: (
  phone_id: UUID,
  banRepository: Repository<Ban>
) => Promise<Ban[]> = (phone_id, banRepository) =>
  banRepository
    .createQueryBuilder("")
    .where("phone_id = :phone_id", { phone_id })
    .execute() as Promise<Ban[]>;
