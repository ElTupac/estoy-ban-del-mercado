import { UUID } from "crypto";
import { Repository } from "typeorm";
import { Warning } from "../entities";

export const getPhoneWarnings: (
  phone_id: UUID,
  warningRepository: Repository<Warning>
) => Promise<Warning[]> = async (phone_id, warningRepository) =>
  (await warningRepository
    .createQueryBuilder()
    .where("phone_id = :phone_id", { phone_id })
    .execute()) as Warning[];
