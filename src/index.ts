import Koa, { Middleware } from "koa";
import logger from "koa-logger";
import Router from "@koa/router";
import dotenv from "dotenv";
import generalErrorHandler from "./middlewares/error/general-handler";
import zodErrorHandler from "./middlewares/error/zod-error-handler";

import parseParams from "./utils/parseParams";
import fetchAllOrders from "./utils/fetchAllOrders";
import convertToBase64ShortCode from "./utils/convertToBase64ShortCode";
import generateCSVStream from "./utils/generateCSVStream";
import generateXLSXStream from "./utils/generateXLSXStream";
import responseFile from "./utils/responseFile";
import importScalableMiddleware from "../solution/importScalableMiddleware";

dotenv.config();

const monitor = require("koa2-monitor");

const app = new Koa();
app.use(logger());
app.use(monitor({ path: "/status", port: 3003 }));
app.use(generalErrorHandler);
app.use(zodErrorHandler);

const router = new Router();

router.get("/heart-beat", (ctx) => (ctx.body = "Hello world"));

router.get(
  "/json",
  importScalableMiddleware(`/src/middlewares/dump-orders-to-json.ts`)
);

router.get("/csv", async (ctx) => {
  await Promise.resolve(parseParams(ctx.query))
    .then(fetchAllOrders)
    .then(generateCSVStream)
    .then(
      responseFile(ctx)(
        `${convertToBase64ShortCode(ctx.querystring)}.csv`,
        "text/csv"
      )
    );
});

router.get("/xlsx", async (ctx) => {
  await Promise.resolve(parseParams(ctx.query))
    .then(fetchAllOrders)
    .then(generateXLSXStream)
    .then(
      responseFile(ctx)(
        `${convertToBase64ShortCode(ctx.querystring)}.xlsx`,
        "application/octet-stream"
      )
    );
});

router.get(
  "/pdf",
  importScalableMiddleware(`/src/middlewares/dump-orders-to-pdf.ts`)
);

app.use(router.routes());

if (!module.parent) app.listen(3000);
