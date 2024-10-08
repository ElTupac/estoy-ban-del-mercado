import { RequestHandler } from "express";
import { Repository } from "typeorm";
import { Ban, Phone, Warning } from "../entities";
import { UUID } from "crypto";
import { getPhoneBans } from "./getPhoneBans";
import { getPhoneWarnings } from "./getPhoneWarnings";
import { phoneOverviewResponse } from "../responses/phone-overview";

const postWarning: (
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
  const { phone, expire_date, reason } = req.body;

  const phoneEntity = await phoneRepository.findOneBy({
    phone,
  });
  let phone_id: UUID | undefined;
  // If there is no phone registered, create one
  if (!phone) {
    const newPhone = new Phone();
    newPhone.phone = phone;
    const { raw } = await phoneRepository
      .createQueryBuilder()
      .insert()
      .into(Phone)
      .values(newPhone)
      .returning("*")
      .execute();
    phone_id = (raw as Phone).id as UUID;
  } else phone_id = phoneEntity?.id as UUID;

  const warning = new Warning();
  warning.expire_date = expire_date;
  warning.reason = reason;
  warning.phone_id = phone_id;
  await warningRepository
    .createQueryBuilder()
    .insert()
    .into(Warning)
    .values(warning)
    .execute();

  const warnings = await getPhoneWarnings(phone_id, warningRepository);
  const bans = await getPhoneBans(phone_id, banRepository);

  return res.send(phoneOverviewResponse(phone, warnings, bans));
};

export default postWarning;
