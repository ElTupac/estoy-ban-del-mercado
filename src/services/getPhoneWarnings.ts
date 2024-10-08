import { UUID } from "crypto";
import { Repository } from "typeorm";
import { Warning } from "../entities";

export const getPhoneWarnings: (
  phone_id: UUID,
  warningRepository: Repository<Warning>
) => Promise<Warning[]> = (phone_id, warningRepository) =>
  warningRepository
    .createQueryBuilder("")
    .where("phone_id = :phone_id", { phone_id })
    .execute() as Promise<Warning[]>;
