import express from "express";
import { DataSource } from "typeorm";
import { Ban, Phone, Warning } from "../entities";
import postWarning from "../services/postWarning";

const routes = async (connection: DataSource) => {
  const _ = express.Router();

  const phoneRepository = await connection.getRepository(Phone);
  const warningRepository = await connection.getRepository(Warning);
  const banRepository = await connection.getRepository(Ban);

  _.post("/", postWarning(phoneRepository, warningRepository, banRepository));

  return _;
};

export default routes;
