import express from "express";
import { DataSource } from "typeorm";
import { Ban, Phone, Warning } from "../entities";
import postBan from "../services/postBan";

const routes = async (connection: DataSource) => {
  const _ = express.Router();

  const phoneRepository = await connection.getRepository(Phone);
  const warningRepository = await connection.getRepository(Warning);
  const banRepository = await connection.getRepository(Ban);

  _.post("/", postBan(phoneRepository, warningRepository, banRepository));

  return _;
};

export default routes;
