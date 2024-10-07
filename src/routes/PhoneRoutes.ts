import express from "express";
import { DataSource } from "typeorm";
import getPhoneOverview from "../services/getPhoneOverview";
import { Ban, Phone, Warning } from "../entities";

const routes = async (connection: DataSource) => {
  const _ = express.Router();

  const phoneRepository = await connection.getRepository(Phone);
  const warningRepository = await connection.getRepository(Warning);
  const banRepository = await connection.getRepository(Ban);

  _.get(
    "/:phoneHandler",
    getPhoneOverview(phoneRepository, warningRepository, banRepository)
  );

  return _;
};

export default routes;
