import { Repository } from "typeorm";
import { Ban, Phone, Warning } from "../entities";
import { RequestHandler } from "express";
import { notFoundResponse } from "../responses/not-found";

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
      if (!phone) throw new Error(`Not found ${phoneHandler}`);
      const warnings = await warningRepository
        .createQueryBuilder("warning")
        .where("warning.phone_id = :phoneId", { phoneId: phone.id })
        .execute();
      const bans = await banRepository
        .createQueryBuilder("ban")
        .where("ban.phone_id = :banId", { banId: phone.id });

      return res.send({
        warnings,
        bans,
      });
    } catch (error) {
      console.error(error);
      return res.status(404).send(notFoundResponse(phoneHandler));
    }
  };

export default getPhoneOverview;
