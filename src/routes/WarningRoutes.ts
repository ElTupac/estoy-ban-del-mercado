import express from "express";
import { DataSource } from "typeorm";
import { Phone, Warning } from "../entities";
import postWarning from "../services/postWarning";

const routes = async (connection: DataSource) => {
  const _ = express.Router();

  const phoneRepository = await connection.getRepository(Phone);
  const warningRepository = await connection.getRepository(Warning);

  _.post("/", postWarning(phoneRepository, warningRepository));

  return _;
};

export default routes;
