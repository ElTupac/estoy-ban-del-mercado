import { Repository } from "typeorm";
import { Ban, Phone, Warning } from "../entities";
import { RequestHandler } from "express";
import { notFoundResponse } from "../responses/not-found";
import { phoneOverviewResponse } from "../responses/phone-overview";
import { getPhoneWarnings } from "./getPhoneWarnings";
import { UUID } from "crypto";
import { getPhoneBans } from "./getPhoneBans";
import { cleanPhone } from "../utils/clean-phone";
import { filterPhone } from "../utils/filter-phone";
import { wtfResponse } from "../responses/wtf";

const getPhoneOverview: (
  phoneRepository: Repository<Phone>,
  warningRepository: Repository<Warning>,
  banRepository: Repository<Ban>
) => RequestHandler<{ phoneHandler: string }> =
  (phoneRepository, warningRepository, banRepository) => async (req, res) => {
    const { phoneHandler } = req.params;

    if (filterPhone(phoneHandler)) return res.status(428).send(wtfResponse());

    try {
      const phone = await phoneRepository.findOneBy({
        phone: cleanPhone(phoneHandler),
      });
      if (!phone)
        return res.send(
          phoneOverviewResponse(cleanPhone(phoneHandler), [], [])
        );
      const warnings = await getPhoneWarnings(
        phone.id as UUID,
        warningRepository
      );
      const bans = await getPhoneBans(phone.id as UUID, banRepository);

      return res.send(
        phoneOverviewResponse(cleanPhone(phoneHandler), warnings, bans)
      );
    } catch (error) {
      console.error(error);
      return res.status(404).send(notFoundResponse(phoneHandler));
    }
  };

export default getPhoneOverview;
