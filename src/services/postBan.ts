import { RequestHandler } from "express";
import { Repository } from "typeorm";
import { Ban, Phone, Warning } from "../entities";
import { UUID } from "crypto";
import { getPhoneBans } from "./getPhoneBans";
import { getPhoneWarnings } from "./getPhoneWarnings";
import { phoneOverviewResponse } from "../responses/phone-overview";

const postBan: (
  phoneRepository: Repository<Phone>,
  warningRepository: Repository<Warning>,
  banRepository: Repository<Ban>
) => RequestHandler<
  {},
  {},
  {
    phone: string;
    reason: string;
    expire_date: string;
  }
> = (phoneRepository, warningRepository, banRepository) => async (req, res) => {
  console.log(req.body);
  const { phone, expire_date, reason } = req.body;

  const phoneEntity = await phoneRepository.findOneBy({
    phone,
  });
  let phone_id: UUID | undefined;
  // If there is no phone registered, create one
  if (!phoneEntity) {
    const newPhone = new Phone();
    newPhone.phone = phone;
    const { raw } = await phoneRepository
      .createQueryBuilder()
      .insert()
      .into(Phone)
      .values(newPhone)
      .returning("*")
      .execute();
    phone_id = (raw[0] as Phone).id as UUID;
  } else phone_id = phoneEntity?.id as UUID;

  const ban = new Ban();
  ban.expire_date = new Date(expire_date).toISOString().split("T")[0];
  ban.reason = reason;
  ban.phone_id = phone_id;
  await warningRepository
    .createQueryBuilder()
    .insert()
    .into(Ban)
    .values(ban)
    .execute();

  const warnings = await getPhoneWarnings(phone_id, warningRepository);
  const bans = await getPhoneBans(phone_id, banRepository);

  return res.send(phoneOverviewResponse(phone, warnings, bans));
};

export default postBan;
