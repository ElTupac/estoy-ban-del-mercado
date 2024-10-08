import { UUID } from "crypto";
import { Repository } from "typeorm";
import { Warning } from "../entities";

export const getPhoneWarnings: (
  phone_id: UUID,
  warningRepository: Repository<Warning>
) => Promise<Warning[]> = async (phone_id, warningRepository) =>
  (
    await (warningRepository
      .createQueryBuilder("warning")
      .where("warning.phone_id = :phone_id", { phone_id })
      .execute() as Promise<Warning[]>)
  ).map((warning) =>
    Object.entries(warning).reduce(
      (accum, [key, value]) => ({
        ...accum,
        [key.replace("warning_", "")]: value,
      }),
      {}
    )
  ) as Warning[];
