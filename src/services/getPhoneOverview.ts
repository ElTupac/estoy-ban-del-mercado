import { Repository } from "typeorm";
import { Ban, Phone, Warning } from "../entities";
import { RequestHandler } from "express";
import { notFoundResponse } from "../responses/not-found";
import { phoneOverviewResponse } from "../responses/phone-overview";
import { getPhoneWarnings } from "./getPhoneWarnings";
import { UUID } from "crypto";
import { getPhoneBans } from "./getPhoneBans";

const getPhoneOverview: (
  phoneRepository: Repository<Phone>,
  warningRepository: Repository<Warning>,
  banRepository: Repository<Ban>
) => RequestHandler<{ phoneHandler: string }> =
  (phoneRepository, warningRepository, banRepository) => async (req, res) => {
    const { phoneHandler } = req.params;

    try {
      const phone = await phoneRepository.findOneBy({
        phone: phoneHandler,
      });
      if (!phone) return res.send(phoneOverviewResponse(phoneHandler, [], []));
      const warnings = await getPhoneWarnings(
        phone.id as UUID,
        warningRepository
      );
      const bans = await getPhoneBans(phone.id as UUID, banRepository);

      return res.send(phoneOverviewResponse(phoneHandler, warnings, bans));
    } catch (error) {
      console.error(error);
      return res.status(404).send(notFoundResponse(phoneHandler));
    }
  };

export default getPhoneOverview;
