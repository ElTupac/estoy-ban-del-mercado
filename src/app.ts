import express, { Express, RequestHandler } from "express";
import morgan from "morgan";
import { DataSource } from "typeorm";
import * as Entities from "./entities";
import cors from "cors";

import phoneRoutes from "./routes/PhoneRoutes";
import warningRoutes from "./routes/WarningRoutes";
import banRoutes from "./routes/BanRoutes";

import { config } from "dotenv";
import { createWarningBanPage } from "./responses/create-warning-ban";
import { indexReponse } from "./responses";
import redirectToPhoneOverview from "./services/redirectToPhoneOverview";
config();

(async () => {
  const router: Express = express();

  router.use(morgan("dev"));
  router.use(express.urlencoded({ extended: false }));
  router.use(express.json());

  const corsWhitelist = (process.env.CORS_ORIGIN || "").split(",");

  const ddbbConnection = await new DataSource({
    type: "postgres",
    ssl: true,
    entities: Entities,
    ...(process.env.DATABASE_URL
      ? { url: process.env.DATABASE_URL }
      : {
          host: process.env.DDBB_HOST || "",
          username: process.env.DDBB_USERNAME || "",
          password: process.env.DDBB_PASSWORD || "",
          database: process.env.DDBB_DATABASE || "",
        }),
  });
  await ddbbConnection.initialize();

  const corsImplementation: RequestHandler = (req, res, next) =>
    cors({
      origin: function (origin, callback) {
        if (
          !origin ||
          !corsWhitelist.length ||
          corsWhitelist[0] === "*" ||
          (origin && corsWhitelist.indexOf(origin) !== -1)
        )
          callback(null, true);
        else callback(new Error("Not allowed by CORS"));
      },
    })(req, res, (err) => {
      if (err) return res.status(403).json({});
      else next(err);
    });

  const passwordProtected: RequestHandler<{}, {}, { password: string }> = (
    req,
    res,
    next
  ) => {
    const { password } = req.body;
    if (password !== process.env.PASSWORD)
      return res.status(401).send("<h1>Flashaste amiguitooo</h1>");
    next();
  };

  router.use("/wpp", corsImplementation, await phoneRoutes(ddbbConnection));
  router.use(
    "/warning",
    corsImplementation,
    passwordProtected,
    await warningRoutes(ddbbConnection)
  );
  router.use(
    "/ban",
    corsImplementation,
    passwordProtected,
    await banRoutes(ddbbConnection)
  );
  router.get("/", corsImplementation, (req, res) => res.send(indexReponse()));
  router.get("/q", corsImplementation, redirectToPhoneOverview());
  router.get("/a", corsImplementation, (req, res) =>
    res.send(createWarningBanPage())
  );

  router.get("/status", (req, res) =>
    res.status(200).json({
      message: "server is up and running",
    })
  );

  router.use((req, res) => {
    const error = new Error("no resource");
    return res.status(404).json({
      message: error.message,
    });
  });

  const PORT = process.env.PORT || 8000;
  router.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})();
