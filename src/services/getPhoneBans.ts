import { UUID } from "crypto";
import { Repository } from "typeorm";
import { Ban } from "../entities";

export const getPhoneBans: (
  phone_id: UUID,
  banRepository: Repository<Ban>
) => Promise<Ban[]> = async (phone_id, banRepository) =>
  (await banRepository
    .createQueryBuilder("ban")
    .where("ban.phone_id = :phone_id", { phone_id })
    .execute()) as Ban[];
