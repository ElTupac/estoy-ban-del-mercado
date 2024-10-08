import express from "express";
import { DataSource } from "typeorm";
import { Ban, Phone } from "../entities";
import postBan from "../services/postBan";

const routes = async (connection: DataSource) => {
  const _ = express.Router();

  const phoneRepository = await connection.getRepository(Phone);
  const banRepository = await connection.getRepository(Ban);

  _.post("/", postBan(phoneRepository, banRepository));

  return _;
};

export default routes;
