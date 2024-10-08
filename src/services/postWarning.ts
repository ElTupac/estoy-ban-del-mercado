import { RequestHandler } from "express";
import { Repository } from "typeorm";
import { Phone, Warning } from "../entities";
import { UUID } from "crypto";
import { cleanPhone } from "../utils/clean-phone";

const postWarning: (
  phoneRepository: Repository<Phone>,
  warningRepository: Repository<Warning>
) => RequestHandler<
  {},
  {},
  {
    phone: string;
    reason: string;
  }
> = (phoneRepository, warningRepository) => async (req, res) => {
  console.log(req.body);
  const { phone, reason } = req.body;

  const phoneEntity = await phoneRepository.findOneBy({
    phone: cleanPhone(phone),
  });
  let phone_id: UUID | undefined;
  // If there is no phone registered, create one
  if (!phoneEntity) {
    const newPhone = new Phone();
    newPhone.phone = cleanPhone(phone);
    const { raw } = await phoneRepository
      .createQueryBuilder()
      .insert()
      .into(Phone)
      .values(newPhone)
      .returning("*")
      .execute();
    phone_id = (raw[0] as Phone).id as UUID;
  } else phone_id = phoneEntity?.id as UUID;

  const warning = new Warning();
  const expire_date = new Date();
  // 3 days warning
  expire_date.setDate(expire_date.getDate() + 3);
  warning.expire_date = expire_date.toISOString().split("T")[0];
  warning.reason = reason;
  warning.phone_id = phone_id;
  await warningRepository
    .createQueryBuilder()
    .insert()
    .into(Warning)
    .values(warning)
    .execute();

  return res.redirect(`/wpp/${cleanPhone(phone)}`);
};

export default postWarning;
