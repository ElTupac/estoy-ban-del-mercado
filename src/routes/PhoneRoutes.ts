import express from "express";
import { DataSource } from "typeorm";

const routes = async (connection: DataSource) => {
  const _ = express.Router();

  return _;
};

export default routes;
